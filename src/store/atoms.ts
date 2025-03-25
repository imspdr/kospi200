import { selector, atom } from "recoil";
import { StockData, StockInfo } from "./types";

export const wholeData = selector<StockInfo[]>({
  key: "wholeData",
  get: async () => {
    const res = await fetch("/kospi200/codes.json");
    if (!res.ok) {
      return [];
    }
    const jsonData: StockInfo[] = await res.json();
    return jsonData.sort((a, b) => b.to_buy.length - a.to_buy.length);
  },
});

export const cachedStockData = atom<StockData[]>({
  key: "cachedStockData",
  default: [],
});

export const nowData = atom<StockData | undefined>({
  key: "nowData",
  default: undefined,
});

export const isDarkTheme = atom<boolean>({
  key: "nowTheme",
  default: false,
});
