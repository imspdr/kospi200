export default function LineChart(props: {
  givenData: number[];
  leftPadding: number;
  rightPadding: number;
  smallFont: number;
  width: number;
  height: number;
  startTop: number;
  color: string;
  title?: string;
  max?: number;
  min?: number;
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
    color,
    title,
    max,
    min,
    customYAxis,
  } = props;

  const scaledLength = givenData.length;
  const padding = 0;
  const maxY = max ? max : Math.max(...givenData);
  const minY = min ? min : Math.min(...givenData);

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
      <path
        d={`${givenData
          .map((d, index) =>
            index === 0 ? `M ${xScale(index)},${yScale(d)}` : `L ${xScale(index)},${yScale(d)}`
          )
          .join(" ")}`}
        fill={"none"}
        strokeWidth={2}
        stroke={color ? color : "var(--sunblue)"}
        opacity="0.8"
      />
      {/* {legens} */}
      {title && (
        <text
          x={leftPadding + 10}
          y={startTop - smallFont}
          font-size={smallFont}
          fill={"var(--foreground)"}
        >
          {title}
        </text>
      )}
    </>
  );
}
