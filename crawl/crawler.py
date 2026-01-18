from crawl_stock_data import crawl_stock_data
from crawl_kospi200 import crawl_kospi200
from crawl_news import crawl_news
from build_analysis import analysis_df, is_buy_signal
import os
import json
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

if __name__ == "__main__":

    # Initialize Firebase Admin
    import os
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    cred_path = os.path.join(BASE_DIR, "serviceAccountKey.json")
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    
    def process_stock(stock, cached_data=None):
        try:
            code = stock["code"]
            name = stock["name"]
            
            print(f"Processing {name} ({code})...")

            if cached_data:
                new_data = crawl_stock_data(code, 2)
                old_analysis = cached_data.get("analysis", [])
                
                # Using a set of dates for faster lookup
                cached_dates = {item["date"] for item in old_analysis}
                for item in new_data:
                    if item["date"] not in cached_dates:
                        old_analysis.append(item)
                
                # Sort by date and keep latest
                old_analysis.sort(key=lambda x: x["date"])
                analysis = analysis_df(old_analysis[-520:])
            else:
                # First time crawl: 2 years (approx 52 pages of 10 days each = 520 days)
                data = crawl_stock_data(code, 52)
                analysis = analysis_df(data)

            news = crawl_news(name)
            to_buy = is_buy_signal(analysis[-1])

            today_price = analysis[-1]["end"]
            last_price = analysis[-2]["end"]
            change = today_price - last_price
            change_percent = (change / last_price) * 100

            last_result = {
                "code": code,
                "name": name.replace("amp;", ""),
                "today": today_price,
                "last": last_price,
                "changePercent": change_percent,
                "absChangePercent": abs(change_percent),
                "analysis": analysis[20:],
                "news": news,
                "to_buy": to_buy
            }
            
            meta_info = {
                "code": code,
                "name": name.replace("amp;", ""),
                "toBuy": to_buy,
                "today": today_price,
                "last": last_price,
                "changePercent": change_percent,
                "absChangePercent": abs(change_percent)
            }
            
            return last_result, meta_info
        except Exception as e:
            print(f"Error processing {stock['name']}: {e}")
            return None, None

    kospi200 = crawl_kospi200()
    codes_with_to_buy = []

    # 1. Load all existing documents to avoid N reads in loop
    print("Loading existing data from Firestore...")
    docs = db.collection("stocks").stream()
    cached_stocks = {doc.id: doc.to_dict() for doc in docs}
    print(f"Loaded {len(cached_stocks)} existing stocks.")

    # 2. Sequential Processing (Modified for stability)
    print("Starting sequential processing...")
    results = []
    
    for i, stock in enumerate(kospi200):
        # Respectful crawling delay
        time.sleep(0.05)
        
        # Process single stock
        res, meta = process_stock(stock, cached_stocks.get(stock["code"]))
        
        if res:
            results.append(res)
            codes_with_to_buy.append(meta)
            
        if i % 10 == 0:
            print(f"Processed {i}/{len(kospi200)} stocks...")

    # 3. Batch Write to Firestore
    print("Writing to Firestore...")
    batch = db.batch()
    batch_count = 0
    
    for res in results:
        doc_ref = db.collection("stocks").document(res["code"])
        batch.set(doc_ref, res)
        batch_count += 1
        
        if batch_count >= 20: # Updated to 20 as per user request
            for attempt in range(3):
                try:
                    batch.commit()
                    print(f"Committed batch of 20.")
                    break
                except Exception as e:
                    if attempt == 2:
                        print(f"Failed to commit batch: {e}")
                        raise e
                    print(f"Error committing batch (attempt {attempt+1}/3): {e}. Retrying...")
                    time.sleep(2 * (attempt + 1))
            
            batch = db.batch()
            batch_count = 0

    if batch_count > 0:
        for attempt in range(3):
            try:
                batch.commit()
                print(f"Committed final batch of {batch_count}.")
                break
            except Exception as e:
                if attempt == 2:
                    print(f"Failed to commit final batch: {e}")
                    raise e
                print(f"Error committing final batch (attempt {attempt+1}/3): {e}. Retrying...")
                time.sleep(2 * (attempt + 1))

    # Upload codes list to Firestore
    db.collection("meta").document("codes").set({"list": codes_with_to_buy})
    print("Done.")
