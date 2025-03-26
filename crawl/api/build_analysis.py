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
    df["rsi"] = df["rsi"].fillna(0)

    # ✅ 4️⃣ 볼린저 밴드 계산
    df["middleBand"] = df["end"].rolling(window=20).mean()
    df["upperBand"] = df["middleBand"] + (df["end"].rolling(window=20).std() * 2)
    df["lowerBand"] = df["middleBand"] - (df["end"].rolling(window=20).std() * 2)

    # ✅ 5️⃣ 거래량 분석 (OBV)
    df["obv"] = (np.sign(df["end"].diff()) * df["amount"]).fillna(0).cumsum()

    # ✅ 결과 확인
    return df.to_dict(orient="records")[20:]

def is_buy_signal(data):
    """
    주어진 데이터가 매수 신호 조건을 만족하는지 판단하는 함수

    조건:
    1. 종가(end)가 볼린저 밴드 하단(lowerBand)보다 낮음
    2. MACD 지표(macd)가 시그널(signal)을 상향 돌파 (macd > signal)
    3. RSI 지표(rsi)가 30 이하 (과매도 상태)
    4. OBV 지표(obv)가 상승세 (이전 OBV 값과 비교 필요, 여기서는 이전 값이 없으므로 가정 필요)

    :param data: 주식 데이터 (dict)
    :return: bool (매수 신호 여부)
    """

    end_price = data["end"]
    lower_band = data["lowerBand"]
    macd = data["macd"]
    signal = data["signal"]
    rsi = data["rsi"]
    obv = data["obv"]

    ret = []
    # 볼린저 밴드 하단 이탈 여부
    condition1 = end_price < lower_band
    if condition1:
        ret.append("band")

    # RSI 과매도 상태 여부
    condition3 = rsi <= 30
    if condition3:
        ret.append("rsi")

    return ret