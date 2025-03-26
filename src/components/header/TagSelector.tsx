import { css } from "@emotion/react";
import { useRecoilState, useRecoilValue } from "recoil";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { filterState, screenSize } from "@src/store/atoms";
import { Chip, Typography } from "@mui/material";

export default function TagSelector() {
  const [filter, setFilter] = useRecoilState(filterState);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
      `}
    >
      <Chip
        css={css`
          opacity: ${filter.tags.includes("rsi") ? 1 : 0.3};
          background-color: var(--warning);
        `}
        onClick={() => {
          setFilter((v) => {
            return {
              ...v,
              tags: v.tags.includes("rsi")
                ? v.tags.filter((tag) => tag !== "rsi")
                : [...v.tags, "rsi"],
            };
          });
        }}
        label={"RSI < 30"}
      ></Chip>
      <Chip
        css={css`
          opacity: ${filter.tags.includes("band") ? 1 : 0.3};
          background-color: var(--highlight);
        `}
        onClick={() => {
          setFilter((v) => {
            return {
              ...v,
              tags: v.tags.includes("band")
                ? v.tags.filter((tag) => tag !== "band")
                : [...v.tags, "band"],
            };
          });
        }}
        label={"lower than Bollinger Band"}
      ></Chip>
    </div>
  );
}
