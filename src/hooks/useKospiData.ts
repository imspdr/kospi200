import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

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

/**
 * Fetch all KOSPI 200 codes and summaries
 */
export const useStocks = () => {
  return useQuery<Stock[]>({
    queryKey: ["stocks"],
    queryFn: async () => {
      try {
        console.log("Fetching code list from Firestore...");
        const docRef = doc(db, "meta", "codes");
        const docSnap = await getDoc(docRef);
        console.log("Code list snapshot exists:", docSnap.exists());
        if (docSnap.exists()) {
          return docSnap.data().list as Stock[];
        } else {
          console.warn("No stock codes found in meta/codes");
          return [];
        }
      } catch (error) {
        console.error("Error fetching stocks:", error);
        throw error;
      }
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
      try {
        if (!code) throw new Error("Stock code is required");
        console.log(`Fetching detail for ${code}...`);
        const docRef = doc(db, "stocks", code);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data() as StockDetail;
        } else {
          throw new Error("Stock not found");
        }
      } catch (error) {
        console.error(`Error fetching stock ${code}:`, error);
        throw error;
      }
    },
    enabled: !!code, // Only run if code is provided
  });
};
