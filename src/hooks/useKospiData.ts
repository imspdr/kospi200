import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Stock {
  code: string;
  name: string;
  toBuy: string[];
  today: number;
  last: number;
  changePercent: number;
  absChangePercent: number;
}

export interface Analysis {
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
}

export interface NewsItem {
  title: string;
  link: string;
  description: string;
}

export interface StockDetail extends Stock {
  analysis: Analysis[];
  news: NewsItem[];
}

const API_PATH = process.env.NODE_ENV === "production" ? "/kospi200/" : "/";

/**
 * Fetch all KOSPI 200 codes and summaries
 */
export const useStocks = () => {
  return useQuery<Stock[]>({
    queryKey: ["stocks"],
    queryFn: async () => {
      const { data } = await axios.get(API_PATH + "data/codes.json");
      return data;
    },
  });
};

/**
 * Fetch detailed data for a specific stock
 */
export const useStockDetail = (code: string | null) => {
  return useQuery<StockDetail>({
    queryKey: ["stock", code],
    queryFn: async () => {
      if (!code) throw new Error("Stock code is required");
      const { data } = await axios.get(API_PATH + `data/data${code}.json`);
      return data;
    },
    enabled: !!code, // Only run if code is provided
  });
};
