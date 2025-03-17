import { css } from "@emotion/react";
import { AnalysisData } from "@src/store/types";
import { useState, useEffect, useRef } from "react";
import { Checkbox, Typography, Skeleton, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import MacdChart from "./MacdChart";
import ObvChart from "./ObvChart";
import RsiChart from "./RsiChart";
import AmountChart from "./AmountChart";

function CheckButton(props: {
  title: string;
  fontSize: number;
  color: string;
  height: number;
  small: boolean;
  v: boolean;
  setV: (v: boolean) => void;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        height: ${props.height}px;
      `}
    >
      {!props.small && (
        <Typography
          sx={{
            fontSize: `${props.fontSize}px`,
          }}
        >
          {props.title}
        </Typography>
      )}
      <Checkbox
        value={props.v}
        checked={props.v}
        size={props.small ? "small" : "medium"}
        onChange={(e, v) => {
          props.setV(e.target.checked);
        }}
        sx={{
          color: props.color,
          "&.Mui-checked": { color: props.color },
        }}
      />
    </div>
  );
}

export default function StockPriceChart(props: {
  data: AnalysisData[];
  width: number;
  height: number;
}) {
  const width = Math.max(props.width, 280);
  const inputHeight = Math.max(props.height, 300) - 10;

  const smallFont = (20 / 1000) * inputHeight;
  const largeFont = (25 / 1000) * inputHeight;

  const smallButton = width < 800;

  const [ma5On, setMa5On] = useState(true);
  const [ma20On, setMa20On] = useState(true);
  const [bandOn, setBandOn] = useState(false);
  const [obvOn, setObvOn] = useState(false);
  const [rsiOn, setRsiOn] = useState(false);
  const [macdOn, setMacdOn] = useState(false);
  const [amountOn, setAmountOn] = useState(true);

  const buttonHeight = (80 / 1000) * inputHeight;

  const svgHeight = inputHeight - buttonHeight;

  const chartGap = smallFont;
  const macdHeight = (150 / 1000) * inputHeight;
  const obvHeight = (150 / 1000) * inputHeight;
  const rsiHeight = (150 / 1000) * inputHeight;
  const amountHeight = (150 / 1000) * inputHeight;

  const mainChartHeight =
    inputHeight -
    buttonHeight -
    (obvOn ? obvHeight + chartGap : 0) -
    (rsiOn ? rsiHeight + chartGap : 0) -
    (macdOn ? macdHeight + chartGap : 0) -
    (amountOn ? amountHeight + chartGap : 0);

  const padding = largeFont;
  const paddingTop = 0;
  const leftPadding = 10;
  const scrollWidth = (5 / 1000) * svgHeight;
  const rightPadding = smallFont * 5;
  const maxScale = 32;

  const [scale, setScale] = useState(1);
  const [nowIndex, setNowIndex] = useState(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const scrolling = useRef<boolean | null>(null);
  const nowX = useRef<number>(0);
  const startX = useRef<number>(0);
  const velocity = useRef<number>(0);
  const lastTimestamp = useRef<number>(0);

  // add key down scroll effect
  const keyDownEvent = function (ev: KeyboardEvent) {
    if (ev.key === "ArrowRight") {
      setNowIndex((v) => Math.min(v + 1, Math.floor(length - length / scale)));
    } else if (ev.key === "ArrowLeft") {
      setNowIndex((v) => Math.max(0, v - 1));
    } else if (ev.key === "ArrowUp") {
      setScale((v) => Math.min(maxScale, v * 2));
    } else if (ev.key === "ArrowDown") {
      setScale((v) => Math.max(1, v / 2));
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", keyDownEvent);
    velocity.current = 0;
    setNowIndex((v) => Math.min(length - scaledLength, v));
    return () => {
      window.removeEventListener("keydown", keyDownEvent);
    };
  }, [scale]);

  const calcStart = (clientX: number) => {
    scrolling.current = true;
    startX.current = clientX;
    nowX.current = clientX;
    lastTimestamp.current = performance.now();
  };
  const calcEnd = () => {
    const t = Math.max(performance.now() - lastTimestamp.current, 200);
    const distance =
      (nowX.current - startX.current) / ((width - leftPadding - rightPadding) / scaledLength);
    velocity.current = (distance / t) * 100;
    scrolling.current = false;
    if (t < 1000) {
      requestAnimationFrame(applyInertia);
    }
  };

  const applyInertia = () => {
    velocity.current *= 0.95;

    setNowIndex((v) => {
      return Math.min(Math.max(0, v + Math.round(velocity.current)), length - scaledLength);
    });

    if (Math.abs(velocity.current) >= 1) {
      requestAnimationFrame(applyInertia);
    }
  };

  const setIndex = (clientPos: number) => {
    const gap =
      (startX.current - clientPos) / ((width - leftPadding - rightPadding) / scaledLength);
    if (Math.abs(gap) >= 1) {
      setNowIndex((v) => {
        return Math.min(Math.max(0, v + (gap >= 0 ? 1 : -1)), length - scaledLength);
      });
      startX.current = clientPos;
    }
  };

  const hoverTexts = [
    {
      label: "날짜",
      value: "date",
    },
    {
      label: "종가",
      value: "end",
    },
    {
      label: "시가",
      value: "start",
    },
    {
      label: "고가",
      value: "high",
    },
    {
      label: "저가",
      value: "low",
    },
  ];

  // select data using state
  const length = props.data.length;
  const scaledLength = Math.floor(length / scale);

  const selectedGivenData = props.data.slice(nowIndex, nowIndex + scaledLength);

  // calc min max value to get proper size
  const maxY = Math.max(
    ...selectedGivenData.map((d) => d.high),
    ...selectedGivenData.map((d) => d.upperBand)
  );
  const minY = Math.min(
    ...selectedGivenData.map((d) => d.low),
    ...selectedGivenData.map((d) => d.lowerBand)
  );

  // functions to transform coordinate to svg's
  const xScale = (x: number) =>
    ((x - nowIndex) / (scaledLength - 1)) * (width - leftPadding - rightPadding) + leftPadding;

  const yScale = (y: number) =>
    mainChartHeight -
    padding -
    ((y - minY) / (maxY - minY)) * (mainChartHeight - 2 * padding - paddingTop);
  // values for grid
  const yGap = Math.round((maxY - minY) / 8);
  const xAxis = [leftPadding, width - rightPadding];
  const yAxis = [...new Array(9)].map((_, i) => {
    return Math.round(minY) + i * yGap;
  });
  return (
    <>
      {!(props.data.length > 0) ? (
        <Skeleton
          variant="rectangular"
          css={css`
            width: ${width}px;
            height: ${inputHeight}px;
          `}
        />
      ) : (
        <div
          css={css`
            height: ${inputHeight}px;
            width: ${width}px;
            display: flex;
            flex-direction: column;
            gap: 3px;
            cursor: ${scrolling.current ? "grabbing" : "grab"};
          `}
        >
          <div
            css={css`
              height: ${buttonHeight}px;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              background-color: var(--paper);
              padding: 0px 10px;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: row;
                gap: 10px;
              `}
            >
              {!smallButton && (
                <>
                  <CheckButton
                    v={ma5On}
                    setV={setMa5On}
                    fontSize={smallFont}
                    small={smallButton}
                    title={"MA 5"}
                    color={"var(--highlight)"}
                    height={buttonHeight}
                  />
                  <CheckButton
                    v={ma20On}
                    setV={setMa20On}
                    fontSize={smallFont}
                    small={smallButton}
                    title={"MA 20"}
                    color={"var(--warning)"}
                    height={buttonHeight}
                  />
                  <CheckButton
                    v={amountOn}
                    setV={setAmountOn}
                    fontSize={smallFont}
                    small={smallButton}
                    title={"거래량"}
                    color={"var(--chart-gray)"}
                    height={buttonHeight}
                  />
                </>
              )}

              <CheckButton
                v={bandOn}
                setV={setBandOn}
                fontSize={smallFont}
                small={smallButton}
                title={"Bollinger Bands"}
                color={"var(--chart-gray)"}
                height={buttonHeight}
              />
              <CheckButton
                v={obvOn}
                setV={setObvOn}
                fontSize={smallFont}
                small={smallButton}
                title={"OBV"}
                color={"var(--gold)"}
                height={buttonHeight}
              />
              <CheckButton
                v={rsiOn}
                setV={setRsiOn}
                fontSize={smallFont}
                small={smallButton}
                title={"RSI"}
                color={"var(--violet)"}
                height={buttonHeight}
              />
              <CheckButton
                v={macdOn}
                setV={setMacdOn}
                fontSize={smallFont}
                small={smallButton}
                title={"MACD & signal"}
                color={"var(--chart-gray)"}
                height={buttonHeight}
              />
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 3px;
              `}
            >
              <IconButton
                onClick={() => {
                  setScale((v) => Math.max(1, v / 2));
                }}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  setScale((v) => Math.min(maxScale, v * 2));
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>
          <svg
            css={css`
              background-color: var(--paper);
            `}
            viewBox={`0 0 ${width} ${svgHeight}`}
            onMouseDown={(e) => {
              calcStart(e.clientX);
            }}
            onMouseUp={() => {
              calcEnd();
            }}
            onMouseMove={(e) => {
              if (scrolling.current && scale > 1) {
                setIndex(e.clientX);
              }
              const svgElement = e.currentTarget;
              const rect = svgElement.getBoundingClientRect();

              const x = ((e.clientX - rect.left) / rect.width) * width;
              const y = ((e.clientY - rect.top) / rect.height) * svgHeight;
              setMousePos({
                x: Math.max(leftPadding, Math.min(x, width - rightPadding)),
                y: Math.max(padding + paddingTop - 10, Math.min(y, svgHeight - padding + 10)),
              });
            }}
            onTouchStart={(e) => {
              if (e.touches[0]) {
                calcStart(e.touches[0].clientX);
              }
            }}
            onTouchMove={(ev) => {
              const t1 = ev.touches[0];
              if (scrolling.current && scale > 1 && t1) {
                setIndex(t1.clientX);
              }
            }}
            onTouchEnd={(e) => {
              calcEnd();
            }}
            onWheel={(e) => {
              if (e.deltaY < 0) {
                setScale((v) => Math.min(maxScale, v * 2));
              } else {
                setScale((v) => Math.max(1, v / 2));
              }
            }}
            onMouseLeave={() => {
              scrolling.current = false;
            }}
          >
            {scale > 1 && (
              <rect
                x={(nowIndex / length) * width}
                y={svgHeight - scrollWidth}
                height={scrollWidth}
                width={width / scale}
                fill="var(--scroll-color)"
              />
            )}
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
            {/* moving average lines */}
            {
              <>
                {ma5On && (
                  <path
                    d={`${selectedGivenData
                      .map((d, index) =>
                        index === 0
                          ? `M ${xScale(nowIndex + index)},${yScale(d.ma5)}`
                          : `L ${xScale(nowIndex + index)},${yScale(d.ma5)}`
                      )
                      .join(" ")}`}
                    fill={"none"}
                    strokeWidth={2}
                    stroke={"var(--highlight)"}
                    opacity="0.3"
                  />
                )}
                {ma20On && (
                  <path
                    d={`${selectedGivenData
                      .map((d, index) =>
                        index === 0
                          ? `M ${xScale(nowIndex + index)},${yScale(d.ma20)}`
                          : `L ${xScale(nowIndex + index)},${yScale(d.ma20)}`
                      )
                      .join(" ")}`}
                    fill={"none"}
                    strokeWidth={2}
                    stroke={"var(--warning)"}
                    opacity="0.3"
                  />
                )}
                {bandOn && (
                  <>
                    <path
                      d={`${selectedGivenData
                        .map((d, index) =>
                          index === 0
                            ? `M ${xScale(nowIndex + index)},${yScale(d.middleBand)}`
                            : `L ${xScale(nowIndex + index)},${yScale(d.middleBand)}`
                        )
                        .join(" ")}`}
                      fill={"none"}
                      strokeWidth={4}
                      stroke={"var(--chart-gray)"}
                      opacity="0.3"
                    />
                    <path
                      d={`${selectedGivenData
                        .map((d, index) =>
                          index === 0
                            ? `M ${xScale(nowIndex + index)},${yScale(d.upperBand)}`
                            : `L ${xScale(nowIndex + index)},${yScale(d.upperBand)}`
                        )
                        .join(" ")}`}
                      fill={"none"}
                      strokeWidth={4}
                      stroke={"var(--chart-gray)"}
                      opacity="0.3"
                    />
                    <path
                      d={`${selectedGivenData
                        .map((d, index) =>
                          index === 0
                            ? `M ${xScale(nowIndex + index)},${yScale(d.lowerBand)}`
                            : `L ${xScale(nowIndex + index)},${yScale(d.lowerBand)}`
                        )
                        .join(" ")}`}
                      fill={"none"}
                      strokeWidth={4}
                      stroke={"var(--chart-gray)"}
                      opacity="0.3"
                    />
                  </>
                )}
              </>
            }
            {/* givenData chart */}
            {selectedGivenData.map((data: AnalysisData, i: number) => {
              const realIndex = nowIndex + i;
              return (
                <>
                  <rect
                    x={
                      xScale(realIndex) -
                      ((1 / (scaledLength - 1)) * (width - leftPadding - rightPadding)) / 4
                    }
                    y={yScale(Math.max(data.end, data.start))}
                    height={Math.max(1, Math.abs(yScale(data.start) - yScale(data.end)))}
                    width={
                      ((1 / (scaledLength - 1)) * (width - leftPadding - rightPadding)) /
                      2 /
                      (xScale(realIndex) >= width - rightPadding - 10 ? 2 : 1)
                    }
                    fill={data.start > data.end ? "var(--chart-blue)" : "var(--chart-red)"}
                  />
                  <rect
                    x={xScale(realIndex) - 0.5}
                    y={yScale(data.high)}
                    height={yScale(data.low) - yScale(data.high)}
                    width={1}
                    fill={data.start > data.end ? "var(--chart-blue)" : "var(--chart-red)"}
                  />
                </>
              );
            })}
            {/* hovered text */}
            {mousePos.x > leftPadding &&
              mousePos.x < width - rightPadding &&
              mousePos.y <= svgHeight - padding + 1 &&
              mousePos.y >= padding + paddingTop - 1 &&
              (function () {
                const price = Math.round(
                  (1 -
                    (mousePos.y - padding - paddingTop) /
                      (mainChartHeight - padding * 2 - paddingTop)) *
                    (maxY - minY) +
                    minY
                );

                const y = mousePos.y;
                const idx = Math.floor(
                  ((mousePos.x - leftPadding) / (width - leftPadding - rightPadding)) * scaledLength
                );
                const x =
                  leftPadding + (idx * (width - leftPadding - rightPadding)) / (scaledLength - 1);
                const drawBox =
                  selectedGivenData[idx] &&
                  price &&
                  price >= selectedGivenData[idx]?.low &&
                  price <= selectedGivenData[idx]?.high;
                const drawBoxHeight = smallFont * 7;
                const drawBoxWidth = smallFont * 8;
                const priceBoxHeight = largeFont * 1.1;
                return (
                  <>
                    {(price == 0 || !!price) && (
                      <>
                        <path
                          d={`M ${xAxis[0]} ${y} L ${xAxis[1]} ${y}`}
                          stroke="var(--chart-grid)"
                          strokeWidth={3}
                        />
                        {y <= mainChartHeight && (
                          <>
                            <rect
                              x={width - rightPadding}
                              y={y - priceBoxHeight / 2}
                              fill={"var(--foreground)"}
                              width={rightPadding}
                              height={priceBoxHeight}
                              rx={largeFont / 4}
                              ry={largeFont / 4}
                            />
                            <text
                              x={width - rightPadding / 2}
                              y={y + priceBoxHeight / 2 - largeFont / 5}
                              fontSize={largeFont}
                              fill={"var(--paper)"}
                              text-anchor="middle"
                            >
                              {price}
                            </text>
                          </>
                        )}
                      </>
                    )}
                    <path
                      d={`M ${x} ${padding + paddingTop} L ${x} ${svgHeight - padding}`}
                      stroke="var(--chart-grid)"
                      strokeWidth={3}
                    />
                    <rect
                      x={Math.max(0, x - rightPadding * 0.6)}
                      y={svgHeight - padding / 2 - priceBoxHeight / 2}
                      fill={"var(--foreground)"}
                      width={rightPadding * 1.2}
                      height={priceBoxHeight}
                      rx={10}
                      ry={10}
                    />
                    <text
                      x={Math.max(rightPadding * 0.6, x)}
                      y={svgHeight - padding / 2 + priceBoxHeight / 5}
                      fontSize={largeFont}
                      fill={"var(--paper)"}
                      text-anchor="middle"
                    >
                      {nowIndex + idx < props.data.length
                        ? selectedGivenData[idx]?.date
                        : nowIndex + idx}
                    </text>
                    {drawBox && (
                      <>
                        {hoverTexts.map((item, index) => {
                          return (
                            <text
                              y={
                                (y > mainChartHeight / 2 ? y - drawBoxHeight : y) +
                                (index + 1) * (smallFont * 1.2)
                              }
                              x={(x > width / 2 ? x - drawBoxWidth : x) + smallFont / 3}
                              fontSize={smallFont}
                              fill={"var(--foreground)"}
                            >
                              {`${item.label} - ${
                                selectedGivenData[idx]![item.value as keyof AnalysisData]
                              }`}
                            </text>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })()}{" "}
            {macdOn && (
              <MacdChart
                givenData={selectedGivenData}
                leftPadding={leftPadding}
                rightPadding={rightPadding}
                smallFont={smallFont}
                nowIndex={nowIndex}
                xScale={xScale}
                width={width}
                height={macdHeight}
                startTop={
                  svgHeight -
                  padding -
                  (amountOn ? amountHeight + chartGap : 0) -
                  (rsiOn ? rsiHeight + chartGap : 0) -
                  (obvOn ? obvHeight + chartGap : 0)
                }
              />
            )}
            {obvOn && (
              <ObvChart
                givenData={selectedGivenData}
                leftPadding={leftPadding}
                rightPadding={rightPadding}
                smallFont={smallFont}
                nowIndex={nowIndex}
                xScale={xScale}
                width={width}
                height={obvHeight}
                startTop={
                  svgHeight -
                  padding -
                  (amountOn ? amountHeight + chartGap : 0) -
                  (rsiOn ? rsiHeight + chartGap : 0)
                }
              />
            )}
            {rsiOn && (
              <RsiChart
                givenData={selectedGivenData}
                leftPadding={leftPadding}
                rightPadding={rightPadding}
                smallFont={smallFont}
                nowIndex={nowIndex}
                xScale={xScale}
                width={width}
                height={rsiHeight}
                startTop={svgHeight - padding - (amountOn ? amountHeight + chartGap : 0)}
              />
            )}
            {amountOn && (
              <AmountChart
                givenData={selectedGivenData}
                leftPadding={leftPadding}
                rightPadding={rightPadding}
                smallFont={smallFont}
                scaledLength={scaledLength}
                nowIndex={nowIndex}
                xScale={xScale}
                width={width}
                height={amountHeight}
                startTop={svgHeight - padding}
              />
            )}
          </svg>
        </div>
      )}
    </>
  );
}
