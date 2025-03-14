import { ReactNode } from "react";

export type StockData = {
  code: string;
  name: string;
} & {
  news: NewsData[];
  analysis: AnalysisData[];
};

export type NewsData = {
  title: string;
  link: string;
};

export type AnalysisData = {
  ds: string;
  y: number;
  start: number;
  upper: number;
  lower: number;
};

export type Playable = {
  id: string;
  top: number;
  left: number;
};

export type PlayableComp = Playable & {
  comp: ReactNode;
};
