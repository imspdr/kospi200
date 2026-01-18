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

    kospi200 = crawl_kospi200()
    codes_with_to_buy = []

    for i, stock in enumerate(kospi200):
        time.sleep(0.05)
        code = stock["code"]
        
        print(f"{i}" + stock["name"])
        
        doc_ref = db.collection("stocks").document(code)
        doc = doc_ref.get()

        if doc.exists:
            cached_data = doc.to_dict()
            new_data = crawl_stock_data(stock["code"], 2)
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
            data = crawl_stock_data(stock["code"], 52)
            analysis = analysis_df(data)

        news = crawl_news(stock["name"])
        to_buy = is_buy_signal(analysis[-1])

        today_price = analysis[-1]["end"]
        last_price = analysis[-2]["end"]
        change = today_price - last_price
        change_percent = (change / last_price) * 100

        last_result = {
            "code": stock["code"],
            "name": stock["name"].replace("amp;", ""),
            "today": today_price,
            "last": last_price,
            "changePercent": change_percent,
            "absChangePercent": abs(change_percent),
            "analysis": analysis[20:],
            "news": news,
            "to_buy": to_buy
        }
        
        # Upload to Firestore
        db.collection("stocks").document(code).set(last_result)
        
        codes_with_to_buy.append({
            "code": stock["code"],
            "name": stock["name"].replace("amp;", ""),
            "toBuy": to_buy,
            "today": today_price,
            "last": last_price,
            "changePercent": change_percent,
            "absChangePercent": abs(change_percent)
        })

    # Upload codes list to Firestore
    db.collection("meta").document("codes").set({"list": codes_with_to_buy})
