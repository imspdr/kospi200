import { useParams } from "react-router-dom";
import { useSelectedStockSetter } from "@src/hooks/useSelectedStockSetter";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { screenSize, selectedStockData } from "@src/store/atoms";
import { css } from "@emotion/react";
import DetailHeader from "@src/components/header/DetailHeader";
import StockPriceChart from "@src/components/charts/StockPriceChart";
import { Skeleton } from "@mui/material";

export default function DetailPage() {
  const { code } = useParams();
  const setCode = useSelectedStockSetter();
  const size = useRecoilValue(screenSize);
  const selectedStock = useRecoilValue(selectedStockData);

  useEffect(() => {
    if (code) {
      setCode(code);
    }
  }, []);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <DetailHeader />
      {selectedStock && (
        <StockPriceChart
          data={selectedStock.analysis}
          width={size.width}
          height={size.height - 49}
        />
      )}
    </div>
  );
}
