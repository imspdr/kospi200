import { selector, atom } from "recoil";
import { StockData } from "./types";

export const wholeData = selector<StockData[]>({
  key: "wholeData",
  get: async () => {
    const res = await fetch("./data/data.json");
    if (!res.ok) {
      return [];
    }
    return await res.json();
  },
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
