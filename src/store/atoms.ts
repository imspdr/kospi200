import { atom } from "recoil";
import { ChartData } from "./types";
import testData from "./data.json";

export const boardState = atom<ChartData[]>({
  key: "boardState",
  default: [
    {
      stockData: testData[0]!,
      posData: {
        top: 100,
        left: 100,
        width: 1000,
        height: 400,
      },
    },
  ],
});
