import { atom } from "recoil";
import { StockData } from "./types";
import testData from "./data.json";

export const wholeData = atom<StockData[]>({
  key: "wholeData",
  default: testData.sort((a, b) => b.to_buy.length - a.to_buy.length),
});

export const nowData = atom<StockData | undefined>({
  key: "nowData",
  default: undefined,
});

export const chartScale = atom<number>({
  key: "chartScale",
  default: 1,
});

export const chartIndex = atom<number>({
  key: "chartIndex",
  default: 1,
});
