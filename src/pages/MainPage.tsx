import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { nowData, wholeData } from "@src/store/atoms";
import StockPriceChart from "@src/components/charts/StockPriceChart";
import AutoComplete from "@src/components/AutoComplete";
import NewsCard from "@src/components/NewsCard";
import NewsAnimation from "@src/components/NewsAnimation";

export default function MainPage() {
  const [nowStockData, setNowStockData] = useRecoilState(nowData);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const wholeStockData = useRecoilValue(wholeData);

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    resize();
    addEventListener("resize", resize);
    return () => removeEventListener("resize", resize);
  }, []);

  return width > 1200 ? (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 3px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 3px;
        `}
      >
        <AutoComplete
          kospi200={wholeStockData}
          width={width / 3 - 10}
          height={48}
          onSelected={(v) => {
            setNowStockData(wholeStockData.find((item) => item.code === v));
          }}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            overflow: hidden;
            gap: 3px;
            height: ${height - 102}px;
          `}
        >
          {nowStockData?.news.map((item) => {
            return (
              <NewsCard title={item.title} link={item.link} width={width / 3 - 10} height={36} />
            );
          })}
        </div>
      </div>
      {nowStockData && (
        <StockPriceChart
          data={nowStockData.analysis}
          width={(width / 3) * 2}
          height={height - 51}
        />
      )}
    </div>
  ) : (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 3px;
      `}
    >
      <AutoComplete
        kospi200={wholeStockData}
        width={width}
        height={48}
        onSelected={(v) => {
          setNowStockData(wholeStockData.find((item) => item.code === v));
        }}
      />
      {nowStockData && (
        <>
          <NewsAnimation newsData={nowStockData.news} height={32} width={width} />
          <StockPriceChart
            data={nowStockData.analysis}
            width={width}
            height={height - 51 - 51 - 35}
          />
        </>
      )}
    </div>
  );
}
