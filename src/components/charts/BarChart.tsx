export default function BarChart(props: {
  givenData: number[];
  leftPadding: number;
  rightPadding: number;
  smallFont: number;
  width: number;
  height: number;
  startTop: number;
  color: string;
}) {
  const { givenData, leftPadding, rightPadding, smallFont, width, height, startTop, color } = props;

  const scaledLength = givenData.length;
  const padding = 0;
  const maxY = Math.max(...givenData);
  const minY = 0;

  const yScale = (y: number) =>
    startTop - ((y - minY) / (maxY - minY)) * (height - 2 * padding) - padding;
  const xScale = (x: number) =>
    (x / (scaledLength - 1)) * (width - leftPadding - rightPadding) + leftPadding;

  // values for grid
  const yGap = Math.round((maxY - minY) / 4);
  const xAxis = [leftPadding, width - rightPadding];
  const yAxis = [...new Array(5)].map((_, i) => {
    return Math.round(minY) + i * yGap;
  });
  return (
    <>
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
      {/* {bar chart given data} */}
      {givenData.map((d, index) => {
        return (
          <rect
            x={
              xScale(index) - ((1 / (scaledLength - 1)) * (width - leftPadding - rightPadding)) / 4
            }
            y={yScale(d)}
            height={yScale(0) - yScale(d)}
            width={
              ((1 / (scaledLength - 1)) * (width - leftPadding - rightPadding)) /
              2 /
              (xScale(index) >= width - rightPadding ? 2 : 1)
            }
            fill={color}
          ></rect>
        );
      })}
    </>
  );
}
