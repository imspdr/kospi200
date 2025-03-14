import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { nowData } from "@src/store/atoms";
import StockPriceChart from "@src/components/charts/StockPriceChart";

export default function MainPage() {
  const nowStockData = useRecoilValue(nowData);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
      `}
    >
      <div>selector</div>
      {nowStockData && (
        <StockPriceChart
          data={nowStockData.analysis}
          width={1200}
          height={window.innerHeight - 49}
        />
      )}
      <div>news</div>
    </div>
  );
}
