import requests
from bs4 import BeautifulSoup


def crawl_news(company_code):
    url = f"https://search.naver.com/search.naver?where=news&query={company_code}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        soup = BeautifulSoup(res.text, "html.parser")

        news_list = []
        
        # Find headlines using partial class match for 'headline1'
        headlines = soup.find_all(lambda tag: tag.get('class') and any('headline1' in c for c in tag.get('class')))
        
        for h in headlines[:5]:  # Limit to 5
            try:
                title = h.get_text().strip()
                link_tag = h.find_parent('a')
                link = link_tag.get('href') if link_tag else None
                
                if not link:
                    continue

                description = ""
                # Find container (full-layout) to locate description (body1)
                container = h.find_parent(class_=lambda c: c and 'full-layout' in c)
                if container:
                    # Look for description in the container
                    desc_tag = container.find(lambda tag: tag.get('class') and any('body1' in c for c in tag.get('class')))
                    if desc_tag:
                         description = desc_tag.get_text().strip()
                    else:
                        # Try wider container if immediate parent didn't work
                        container_wide = container.parent
                        if container_wide:
                             desc_tag = container_wide.find(lambda tag: tag.get('class') and any('body1' in c for c in tag.get('class')))
                             if desc_tag:
                                 description = desc_tag.get_text().strip()

                news_list.append({
                    "title": title,
                    "link": link,
                    "description": description
                })
            except Exception as e:
                # Silently skip items that fail validation
                continue
                
        return news_list

    except Exception as e:
        print(f"Error crawling news for {company_code}: {e}")
        return []

if __name__ == "__main__":
    print(crawl_news("삼성전자"))
