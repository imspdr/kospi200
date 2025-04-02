import { css } from "@emotion/react";
import Title from "./Title";
import ThemeToggle from "./ThemeToggle";
import { unselectable } from "@src/util";
import { Divider, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { selectedStockData, screenSize } from "@src/store/atoms";
import { useRecoilValue } from "recoil";
import AutoComplete from "./AutoComplete";

export default function DetailHeader() {
  const navigate = useNavigate();
  const selectedStock = useRecoilValue(selectedStockData);
  const size = useRecoilValue(screenSize);
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
          height: 48px;
          padding: 0px 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            flex-direction: row;
            gap: 3px;
          `}
        >
          <IconButton
            onClick={() => navigate("/")}
            css={css`
              margin: 5px;
            `}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Title title={selectedStock ? selectedStock.name : "-"} />
          {size.width >= 768 && <AutoComplete width={300} height={48} />}
        </div>

        <ThemeToggle />
      </div>

      <Divider
        css={css`
          width: 100%;
        `}
      />
    </div>
  );
}
