from crawl.api.crawl_news import crawl_news
from crawl.api.crawl_stock_data import crawl_stock_data
from crawl.api.crawl_kospi200 import crawl_kospi200
from crawl.api.build_analysis import analysis_df, is_buy_signal
import os
import json
import time

if __name__ == "__main__":

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    store_path = os.path.join(BASE_DIR, "../public/kospi200/")

    codes_filename = "codes.json"
    kospi200 = crawl_kospi200()
    codes_with_to_buy = []

    for i, stock in enumerate(kospi200):
        time.sleep(1)
        code = stock["code"]
        filename = f"data{code}.json"
        try:
            with open(os.path.join(store_path, filename), "r") as f:
                cached_data = json.load(f)
        except Exception:
            cached_data = None

        print(f"{i}" + stock["name"])
        if cached_data:
            new_data = crawl_stock_data(stock["code"], 1)
            old_analysis = cached_data["analysis"]
            merged_dict = {item["date"]: item for item in old_analysis + new_data}
            analysis = analysis_df(list(merged_dict.values())[-500:])
        else:
            data = crawl_stock_data(stock["code"], 52)
            analysis = analysis_df(data)

        news = crawl_news(stock["name"])
        to_buy = is_buy_signal(analysis[-1], analysis[-2])

        last_result = {
            "code": stock["code"],
            "name": stock["name"],
            "analysis": analysis,
            "news": news,
            "to_buy": to_buy
        }
        codes_with_to_buy.append({
            "code": stock["code"],
            "name": stock["name"],
            "to_buy": to_buy
        })
        with open(os.path.join(store_path, filename), "w", encoding="utf-8") as f:
            json.dump(last_result, f, ensure_ascii=False, indent=4)


    with open(os.path.join(store_path, codes_filename), "w", encoding="utf-8") as f:
        json.dump(codes_with_to_buy, f, ensure_ascii=False, indent=4)