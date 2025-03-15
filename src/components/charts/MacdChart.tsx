import { AnalysisData } from "@src/store/types";
import { css } from "@emotion/react";

export default function MacdChart(props: {
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
  const maxY = Math.max(...givenData.map((d) => d.macd), ...givenData.map((d) => d.signal));
  const minY = Math.min(...givenData.map((d) => d.macd), ...givenData.map((d) => d.signal));

  const yScale = (y: number) =>
    height - ((y - minY) / (maxY - minY)) * (height - 2 * padding) - padding;

  // values for grid
  const xAxis = [leftPadding, width - rightPadding];
  const yAxis = [Math.round(minY), 0, Math.round(maxY)];
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      css={css`
        background-color: var(--paper);
      `}
    >
      <circle cx={leftPadding + smallFont} cy={padding + smallFont} r="5" fill="var(--sunblue)" />
      <text
        x={leftPadding + smallFont + 10}
        y={padding + smallFont + 5}
        font-size={smallFont}
        fill={"var(--foreground)"}
      >
        MACD
      </text>

      <circle
        cx={leftPadding + smallFont}
        cy={padding + 2 * smallFont}
        r="5"
        fill="var(--sunred)"
      />
      <text
        x={leftPadding + smallFont + 10}
        y={padding + 2 * smallFont + 5}
        font-size={smallFont}
        fill={"var(--foreground)"}
      >
        Signal
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
      {/* macd , signal */}
      {
        <>
          <path
            d={`${givenData
              .map((d, index) =>
                index === 0
                  ? `M ${xScale(nowIndex + index)},${yScale(d.macd)}`
                  : `L ${xScale(nowIndex + index)},${yScale(d.macd)}`
              )
              .join(" ")}`}
            fill={"none"}
            strokeWidth={2}
            stroke={"var(--sunblue)"}
            opacity="0.8"
          />
          <path
            d={`${givenData
              .map((d, index) =>
                index === 0
                  ? `M ${xScale(nowIndex + index)},${yScale(d.signal)}`
                  : `L ${xScale(nowIndex + index)},${yScale(d.signal)}`
              )
              .join(" ")}`}
            fill={"none"}
            strokeWidth={2}
            stroke={"var(--sunred)"}
            opacity="0.8"
          />
        </>
      }
    </svg>
  );
}
