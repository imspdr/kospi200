import requests
from bs4 import BeautifulSoup
import time

def crawl_stock_data(code: str, length: int = 10):
    base_url = f'https://finance.naver.com/item/sise_day.naver?code={code}&page='
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    result_data = []
    for i in range(1, length + 1):
        time.sleep(0.05)  # Respectful crawling
        result = requests.get(base_url + str(i), headers=headers).text
        soup = BeautifulSoup(result, "html.parser")

        trs = soup.find_all("tr")
        for tr in trs:
            find_date = tr.find("span", class_="tah p10 gray03")
            if not find_date:
                continue
            date = find_date.text
            values = tr.find_all("td")
            if not len(values) > 0:
                continue
            result_data.append({
                "date": date,
                "end": int(values[1].text.replace(",","")),
                "start": int(values[3].text.replace(",","")),
                "high": int(values[4].text.replace(",","")),
                "low": int(values[5].text.replace(",","")),
                "amount": int(values[6].text.replace(",",""))
            })
    result_data.reverse()
    return result_data

if __name__ == "__main__":
    print(crawl_stock_data("489790"))