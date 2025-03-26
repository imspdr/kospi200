import { atom } from "recoil";
import { StockData, StockInfo, Tags } from "./types";

export const stockInfos = atom<StockInfo[]>({
  key: "stockInfos",
  default: [],
});

export const cachedStockDatas = atom<StockData[]>({
  key: "cachedStockDatas",
  default: [],
});

export const filterState = atom<{
  open: boolean;
  searchText: string;
  tags: Tags[];
}>({
  key: "filterState",
  default: {
    open: false,
    searchText: "",
    tags: [],
  },
});

export const selectedStockData = atom<{
  data: StockData | undefined;
  loading: boolean;
}>({
  key: "selectedStockData",
  default: { data: undefined, loading: false },
});

export const screenSize = atom<{ width: number; height: number }>({
  key: "screenSize",
  default: { width: window.innerWidth, height: window.innerHeight },
});

export const isDarkTheme = atom<boolean>({
  key: "isDarkTheme",
  default: false,
});
