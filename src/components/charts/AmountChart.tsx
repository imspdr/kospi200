import { AnalysisData } from "@src/store/types";
import { css } from "@emotion/react";

export default function AmountChart(props: {
  givenData: AnalysisData[];
  leftPadding: number;
  rightPadding: number;
  smallFont: number;
  scaledLength: number;
  nowIndex: number;
  xScale: (x: number) => number;
  width: number;
  height: number;
}) {
  const {
    givenData,
    leftPadding,
    rightPadding,
    smallFont,
    scaledLength,
    nowIndex,
    xScale,
    width,
    height,
  } = props;

  const padding = 10;
  const maxY = Math.max(...givenData.map((d) => d.amount));
  const minY = 0;

  const yScale = (y: number) =>
    height - ((y - minY) / (maxY - minY)) * (height - 2 * padding) - padding;

  // values for grid
  const yGap = Math.round((maxY - minY) / 4);
  const xAxis = [leftPadding, width - rightPadding];
  const yAxis = [...new Array(5)].map((_, i) => {
    return Math.round(minY) + i * yGap;
  });
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      css={css`
        background-color: var(--paper);
      `}
    >
      {/* {grid line} */}
      {yAxis.map((y) => (
        <>
          <path
            d={`M ${xAxis[0]} ${yScale(y)} L ${xAxis[1]} ${yScale(y)}`}
            stroke="var(--chart-grid)"
            strokeWidth={1}
          />
          <text
            x={width - rightPadding + smallFont - 5}
            y={yScale(y) + 5}
            fontSize={smallFont}
            fill={"var(--foreground)"}
          >
            {y}
          </text>
        </>
      ))}
      {/* Amount */}
      {givenData.map((d, index) => {
        return (
          <rect
            x={
              xScale(index + nowIndex) -
              ((1 / (scaledLength - 1)) * (width - leftPadding - rightPadding)) / 4
            }
            y={yScale(d.amount)}
            height={yScale(0) - yScale(d.amount)}
            width={
              ((1 / (scaledLength - 1)) * (width - leftPadding - rightPadding)) /
              2 /
              (xScale(index + nowIndex) >= width - rightPadding - 10 ? 2 : 1)
            }
            fill={"var(--chart-gray)"}
          ></rect>
        );
      })}
    </svg>
  );
}
