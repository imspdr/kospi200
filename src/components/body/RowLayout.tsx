import { useRecoilValue } from "recoil";
import { filteredStockInfos } from "@src/store/selectors";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import { StockInfo } from "@src/store/types";

function StockRow(props: { stock: StockInfo }) {
  const navigate = useNavigate();
  const stock = props.stock;
  return (
    <div
      key={`card-${stock.name}`}
      css={css`
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 20px);
        padding: 2px 10px;
        background-color: var(--paper);
        overflow: hidden;
      `}
      onClick={() => {
        navigate(`/detail/${stock.code}`);
      }}
    >
      <Typography noWrap>
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

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      {stockInfos.map((stock) => {
        return (
          <>
            <StockRow stock={stock} />
            <Divider />
          </>
        );
      })}
    </div>
  );
}
