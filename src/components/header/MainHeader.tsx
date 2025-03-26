import { css } from "@emotion/react";
import Title from "./Title";
import ThemeToggle from "./ThemeToggle";
import { unselectable } from "@src/util";
import { Divider, IconButton } from "@mui/material";
import { useState } from "react";
import { FilterAlt } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import { filterState } from "@src/store/atoms";

export default function Header() {
  const setFilterOpen = useSetRecoilState(filterState);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        background-color: var(--paper);
        ${unselectable}
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          width: calc(100% - 20px);
          align-items: center;
          justify-content: space-between;
          max-width: 1000px;
          height: 48px;
          padding: 0px 10px;
        `}
      >
        <Title />
        <div
          css={css`
            display: flex;
            align-items: center;
            flex-direction: row;
            gap: 3px;
          `}
        >
          <IconButton
            onClick={() =>
              setFilterOpen((v) => {
                return { ...v, open: !v.open };
              })
            }
            css={css`
              margin: 5px;
            `}
          >
            <FilterAlt />
          </IconButton>
          <ThemeToggle />
        </div>
      </div>

      <Divider
        css={css`
          width: 100%;
        `}
      />
    </div>
  );
}
