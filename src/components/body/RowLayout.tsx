import { useRecoilValue } from "recoil";
import { filteredStockInfos } from "@src/store/selectors";
import { screenSize } from "@src/store/atoms";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Typography, Chip } from "@mui/material";
import { useState } from "react";
import { StockInfo } from "@src/store/types";

function StockCard(props: { stock: StockInfo; width: number }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const { stock, width } = props;
  const padding = 10;
  return (
    <div
      key={`card-${stock.name}`}
      css={css`
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px;
        width: ${width - padding * 2}px;
        height: ${width / 7 - padding * 2}px;
        padding: ${padding + (hover ? -1 : 0)}px;
        background-color: var(--paper);
        overflow: hidden;
        ${hover && "border: 1px solid;"}
      `}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      onClick={() => {
        navigate(`/detail/${stock.code}`);
      }}
    >
      <Typography fontWeight="bold" noWrap>
        {stock.name.replace("amp;", "")}
        {stock.to_buy.map((tag) => (
          <span
            css={css`
              font-size: 0.75em;
              color: #888;
              margin-left: 5px;
            `}
          >
            {tag}
          </span>
        ))}
      </Typography>
      <Typography
        noWrap
        css={css`
          color: ${stock.today > stock.last
            ? "var(--chart-red)"
            : stock.today === stock.last
            ? "var(--chart-gray)"
            : "var(--chart-blue)"};
        `}
      >
        {`${stock.today} (${stock.today > stock.last ? "+" : ""}${
          stock.today - stock.last ? stock.today - stock.last : "-"
        })`}
      </Typography>
    </div>
  );
}

export default function CardLayout() {
  const stockInfos = useRecoilValue(filteredStockInfos);
  const size = useRecoilValue(screenSize);
  const layoutWidth = Math.min(1000, size.width - 20);
  const nCol = Math.max(1, Math.floor(layoutWidth / 300));
  const cardWidth = Math.floor(layoutWidth / nCol) - 20;

  return (
    <div
      css={css`
        overflow: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          width: calc(100% - 25px);

          max-width: 1000px;
          padding: 10px 0px 10px 20px;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: flex-start;
        `}
      >
        {stockInfos.map((stock) => {
          return <StockCard stock={stock} width={cardWidth} />;
        })}
      </div>
    </div>
  );
}
