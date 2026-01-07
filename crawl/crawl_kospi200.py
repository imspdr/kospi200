import requests
from bs4 import BeautifulSoup
import time

base_url = "https://finance.naver.com/sise/entryJongmok.nhn?&page="

def crawl_kospi200():
    return_list = []
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    for i in range(20):
        time.sleep(0.1)
        result = requests.get(base_url + str(i + 1), headers=headers).text
        soup = BeautifulSoup(result, "html.parser")
        stocks = soup.find_all("td", class_="ctg")
        for stock in stocks:
            try:
                code = str(stock).split("code=")[1].split("\"")[0]
                name = str(stock).split("ent\">")[1].split("<")[0]
                return_list.append({
                    "code": code,
                    "name": name
                })
            except TypeError:
                continue
    return return_list

if __name__ == "__main__":
    print(crawl_kospi200())