import { css } from "@emotion/react";
import { useRecoilState } from "recoil";
import { boardState } from "@src/store/atoms";
import DragableComponent from "@src/components/DragableComponent";
import TimeseriesChart from "@src/components/TimeseriesChart";
import { Dragable } from "@src/store/types";

export default function MainPage() {
  const [nowBoard, setNowBoard] = useRecoilState(boardState);

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      {nowBoard.map((item) => {
        return (
          <DragableComponent
            {...item.posData}
            setPos={(v: Dragable) => {
              setNowBoard((now) =>
                now.map((chart) =>
                  chart.stockData.code === item.stockData.code ? { ...chart, posData: v } : chart
                )
              );
            }}
          >
            {
              <TimeseriesChart
                data={item.stockData.analysis}
                width={item.posData.width}
                height={item.posData.height}
              />
            }
          </DragableComponent>
        );
      })}
    </div>
  );
}
