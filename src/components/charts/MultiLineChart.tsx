export default function MultiLineChart(props: {
  givenData: number[][];
  leftPadding: number;
  rightPadding: number;
  smallFont: number;
  width: number;
  height: number;
  startTop: number;
  colors: string[];
  titles?: string[];
  customYAxis?: number[];
}) {
  const {
    givenData,
    leftPadding,
    rightPadding,
    smallFont,
    width,
    height,
    startTop,
    colors,
    titles,
    customYAxis,
  } = props;

  const scaledLength = givenData[0] ? givenData[0].length : 1;
  const padding = 0;
  const maxY = Math.max(...givenData.flat(1));
  const minY = Math.min(...givenData.flat(1));

  const yScale = (y: number) =>
    startTop - ((y - minY) / (maxY - minY)) * (height - 2 * padding) - padding;
  const xScale = (x: number) =>
    (x / (scaledLength - 1)) * (width - leftPadding - rightPadding) + leftPadding;

  // values for grid
  const yGap = Math.round((maxY - minY) / 4);
  const xAxis = [leftPadding, width - rightPadding];
  const yAxis = customYAxis
    ? customYAxis
    : [...new Array(5)].map((_, i) => {
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
      {/* {line chart given data} */}
      <>
        {givenData.map((arrayItem: number[], index) => {
          return (
            <path
              d={`${arrayItem
                .map((d, index) =>
                  index === 0
                    ? `M ${xScale(index)},${yScale(d)}`
                    : `L ${xScale(index)},${yScale(d)}`
                )
                .join(" ")}`}
              fill={"none"}
              strokeWidth={2}
              stroke={colors[index] ? colors[index] : "var(--sunblue)"}
              opacity="0.8"
            />
          );
        })}
      </>
      {/* {legens} */}
      <>
        {titles &&
          titles.map((title, index) => {
            return (
              <>
                <circle
                  cx={leftPadding + smallFont}
                  cy={startTop - (index + 1) * smallFont - 5}
                  r="5"
                  fill={colors[index] ? colors[index] : "var(--sunblue)"}
                />
                <text
                  x={leftPadding + smallFont + 10}
                  y={startTop - (index + 1) * smallFont}
                  font-size={smallFont}
                  fill={"var(--foreground)"}
                >
                  {title}
                </text>
              </>
            );
          })}
      </>
    </>
  );
}
