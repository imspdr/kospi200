import { AnalysisData } from "@src/store/types";
import { css } from "@emotion/react";

export default function ObvChart(props: {
  givenData: AnalysisData[];
  leftPadding: number;
  rightPadding: number;
  smallFont: number;
  nowIndex: number;
  xScale: (x: number) => number;
  width: number;
  height: number;
}) {
  const { givenData, leftPadding, rightPadding, smallFont, nowIndex, xScale, width, height } =
    props;

  const padding = 10;
  const maxY = Math.max(...givenData.map((d) => d.obv));
  const minY = Math.min(...givenData.map((d) => d.obv));

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
      <text
        x={leftPadding + smallFont}
        y={padding + smallFont + 5}
        font-size={smallFont}
        fill={"var(--foreground)"}
      >
        OBV
      </text>

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
      {/* rsi */}
      {
        <>
          <path
            d={`${givenData
              .map((d, index) =>
                index === 0
                  ? `M ${xScale(nowIndex + index)},${yScale(d.obv)}`
                  : `L ${xScale(nowIndex + index)},${yScale(d.obv)}`
              )
              .join(" ")}`}
            fill={"none"}
            strokeWidth={2}
            stroke={"var(--gold)"}
            opacity="0.8"
          />
        </>
      }
    </svg>
  );
}
