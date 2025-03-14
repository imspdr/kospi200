import { css } from "@emotion/react";
import { AnalysisData } from "@src/store/types";
import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@mui/material";

export default function TimeseriesChart(props: {
  data: AnalysisData[];
  width: number;
  height: number;
}) {
  const width = Math.max(Math.min(1600, props.width), 280);
  const height = Math.max(Math.min(1000, props.height), 300);
  const padding = (50 / 1000) * height;
  const paddingTop = (50 / 1000) * height;
  const leftPadding = (30 / 1600) * width;
  const scrollWidth = (5 / 1000) * height;
  const smallFont = (30 / 1000) * height;
  const largeFont = (35 / 1000) * height;
  const rightPadding = smallFont * 5;
  const maxScale = 32;

  const [scale, setScale] = useState(1);
  const [nowIndex, setNowIndex] = useState(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const transitionOn = useRef<boolean | null>(null);
  const scrolling = useRef<boolean | null>(null);
  const nowX = useRef<number>(0);
  const startX = useRef<number>(0);
  const velocity = useRef<number>(0);
  const lastTimestamp = useRef<number>(0);

  useEffect(() => {
    setNowIndex((v) => Math.min(length - scaledLength, v));
  }, [scale]);

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
  const maxY = Math.max(...selectedGivenData.map((d) => d.high));
  const minY = Math.min(...selectedGivenData.map((d) => d.low));

  // functions to transform coordinate to svg's
  const xScale = (x: number) =>
    ((x - nowIndex) / (scaledLength - 1)) * (width - leftPadding - rightPadding) + leftPadding;
  const baseScale = (y: number) =>
    height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding - paddingTop);

  const yScale = (y: number) => {
    return baseScale(y);
  };
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
            height: ${height}px;
          `}
        />
      ) : (
        <div
          css={css`
            height: ${height}px;
            width: ${width}px;
            background-color: var(--paper);
            cursor: ${scrolling.current ? "grabbing" : "grab"};
            .y-transition {
              transition: ${transitionOn.current ? "0.3s ease-in" : "0s"};
            }
          `}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
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
              const y = ((e.clientY - rect.top) / rect.height) * height;
              setMousePos({
                x: Math.max(leftPadding, Math.min(x, width - rightPadding)),
                y: Math.max(padding + paddingTop - 10, Math.min(y, height - padding + 10)),
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
                y={height - scrollWidth}
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
                  className="y-transition"
                />
                <text
                  x={width - rightPadding + smallFont - 5}
                  y={yScale(y) + 10}
                  fontSize={smallFont}
                  fill={"var(--foreground)"}
                  className="y-transition"
                >
                  {y}
                </text>
              </>
            ))}
            {/* givenData chart */}
            {selectedGivenData.map((data: AnalysisData, i: number) => {
              const realIndex = nowIndex + i;
              return (
                <>
                  <rect
                    className="y-transition"
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
                    className="y-transition"
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
              mousePos.y <= height - padding + 1 &&
              mousePos.y >= padding + paddingTop - 1 &&
              (function () {
                const price = Math.round(
                  (1 - (mousePos.y - padding - paddingTop) / (height - padding * 2 - paddingTop)) *
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
                          className="y-transition"
                        />
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
                          className="y-transition"
                          text-anchor="middle"
                        >
                          {price}
                        </text>
                      </>
                    )}
                    <path
                      d={`M ${x} ${padding + paddingTop} L ${x} ${height - padding}`}
                      stroke="var(--chart-grid)"
                      strokeWidth={3}
                      className="y-transition"
                    />
                    <rect
                      x={Math.max(0, x - rightPadding * 0.6)}
                      y={height - padding / 2 - priceBoxHeight / 2}
                      fill={"var(--foreground)"}
                      width={rightPadding * 1.2}
                      height={priceBoxHeight}
                      rx={10}
                      ry={10}
                    />
                    <text
                      x={Math.max(rightPadding * 0.6, x)}
                      y={height - padding / 2 + priceBoxHeight / 5}
                      fontSize={largeFont}
                      fill={"var(--paper)"}
                      className="y-transition"
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
                                (y > height / 2 ? y - drawBoxHeight : y) +
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
            {/* {top side buttons} */}
            {
              <>
                <text
                  x={width - rightPadding + smallFont * 1}
                  y={paddingTop}
                  fontSize={smallFont}
                  fill={"var(--foreground)"}
                  text-anchor="middle"
                  onClick={() => {
                    setScale((v) => Math.max(1, v / 2));
                  }}
                >
                  {"<"}
                </text>
                <text
                  x={width - rightPadding + smallFont * 2.5}
                  y={paddingTop}
                  fontSize={smallFont}
                  fill={"var(--foreground)"}
                  text-anchor="middle"
                >
                  {`x${scale.toFixed(0)}`}
                </text>
                <text
                  x={width - rightPadding + smallFont * 4}
                  y={paddingTop}
                  fontSize={smallFont}
                  fill={"var(--foreground)"}
                  text-anchor="middle"
                  onClick={() => {
                    setScale((v) => Math.min(maxScale, v * 2));
                  }}
                >
                  {">"}
                </text>
              </>
            }
          </svg>
        </div>
      )}
    </>
  );
}
