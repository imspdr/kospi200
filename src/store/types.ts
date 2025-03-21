import { ReactNode } from "react";

export type StockInfo = {
  code: string;
  name: string;
  to_buy: string[];
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

export type Dragable = {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  comp: ReactNode;
};
