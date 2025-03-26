export type Tags = "rsi" | "band";
export type StockInfo = {
  code: string;
  name: string;
  to_buy: Tags[];
  today: number;
  last: number;
};
export type StockData = {
  code: string;
  name: string;
  news: NewsData[];
  analysis: AnalysisData[];
};

export type NewsData = {
  title: string;
  link: string;
};

export type AnalysisData = {
  date: string;
  end: number;
  start: number;
  high: number;
  low: number;
  amount: number;
  ma5: number;
  ma20: number;
  macd: number;
  signal: number;
  rsi: number;
  middleBand: number;
  upperBand: number;
  lowerBand: number;
  obv: number;
};
