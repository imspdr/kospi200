import { atom } from "recoil";
import { StockData } from "./types";
import testData from "./data.json";

export const wholeData = atom<StockData[]>({
  key: "wholeData",
  default: testData,
});

export const nowData = atom<StockData | undefined>({
  key: "nowData",
  default: testData[0]!,
});
