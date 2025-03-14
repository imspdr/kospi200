import pandas as pd
import numpy as np

def analysis_df(given_data):
    # 📌 List of dict → Pandas DataFrame 변환
    df = pd.DataFrame(given_data)

    # 📌 Date 컬럼을 datetime 형식으로 변환 후 인덱스로 설정
    df["Date"] = pd.to_datetime(df["date"])
    df.set_index("Date", inplace=True)

    # ✅ 1️⃣ 이동 평균 (Moving Average)
    df["ma5"] = df["end"].rolling(window=5).mean()
    df["ma20"] = df["end"].rolling(window=20).mean()

    # ✅ 2️⃣ MACD 계산
    short_ema = df["end"].ewm(span=12, adjust=False).mean()
    long_ema = df["end"].ewm(span=26, adjust=False).mean()
    df["macd"] = short_ema - long_ema
    df["signal"] = df["macd"].ewm(span=9, adjust=False).mean()

    # ✅ 3️⃣ RSI 계산
    delta = df["end"].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    df["rsi"] = 100 - (100 / (1 + rs))

    # ✅ 4️⃣ 볼린저 밴드 계산
    df["middleBand"] = df["end"].rolling(window=20).mean()
    df["upperBand"] = df["middleBand"] + (df["end"].rolling(window=20).std() * 2)
    df["lowerBand"] = df["middleBand"] - (df["end"].rolling(window=20).std() * 2)

    # ✅ 5️⃣ 거래량 분석 (OBV)
    df["obv"] = (np.sign(df["end"].diff()) * df["amount"]).fillna(0).cumsum()

    # ✅ 결과 확인
    return df.to_dict(orient="records")[20:]
