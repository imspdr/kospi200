# KOSPI 200 Dashboard

KOSPI 200 종목의 주가 흐름과 관련 뉴스 동향을 한눈에 파악할 수 있는 대시보드 프로젝트입니다.
매일 수집되는 데이터를 바탕으로 시장의 흐름을 시각화하여 제공합니다.

## 🚀 주요 기능

- **일일 데이터 크롤링**: Python 스크립트를 통해 매일 KOSPI 200 주가 데이터와 관련 뉴스를 자동으로 수집합니다.
- **Firebase 연동**: 수집된 모든 데이터는 Firebase Store에 안전하게 저장되며, 실시간으로 프론트엔드와 동기화됩니다.
- **동향 시각화**:
  - **주가 차트**: 개별 종목의 주가 변동 추이를 직관적인 차트로 제공합니다.
  - **뉴스 분석**: 종목별 관련 뉴스를 함께 제공하여 주가 변동의 원인을 파악하는 데 도움을 줍니다.

## 🏗️ 전체 구조

이 프로젝트는 크게 데이터 수집부와 시각화 프론트엔드로 나뉩니다.

### 1. Data Collector (Python)
- `crawl/` 디렉토리 내의 스크립트들이 수행합니다.
- 주가 정보(`crawl_stock_data.py`)와 뉴스(`crawl_news.py`)를 수집하여 가공 후 Firebase에 업로드합니다.

### 2. Frontend (React)
- 수집된 데이터를 사용자 친화적인 UI로 시각화합니다.
- **Tech Stack**: React, TypeScript, ECharts, @imspdr/ui, React Query

## 📦 설치 및 실행

### Frontend
```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev  
```

