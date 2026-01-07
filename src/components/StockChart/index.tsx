import { Button, useTheme } from '@imspdr/ui';
import ReactECharts from 'echarts-for-react';
import { useMemo, FC, useState } from 'react';
import { Analysis } from '../../hooks/useKospiData';
import { ChartContainer, OverlayControls } from './styled';

interface StockChartProps {
  data: Analysis[];
}

interface Overlays {
  bb: boolean;
  ma5: boolean;
  ma20: boolean;
  volume: boolean;
  rsi: boolean;
  obv: boolean;
  macd: boolean;
}

export const StockChart: FC<StockChartProps> = ({ data }) => {
  const [activeOverlays, setActiveOverlays] = useState<Overlays>({
    bb: false,
    ma5: true,
    ma20: true,
    volume: true,
    rsi: false,
    obv: false,
    macd: false,
  });

  const chartData = useMemo(() => {
    const dates = data.map((item) => item.date);
    const candleData = data.map((item) => [
      Number(item.start),
      Number(item.end),
      Number(item.low),
      Number(item.high),
    ]);
    const volumes = data.map((item, index) => [
      index,
      Number(item.amount),
      Number(item.end) > Number(item.start) ? 1 : -1,
    ]);

    return {
      dates,
      candleData,
      volumes,
      upperBands: data.map((item) => Number(item.upperBand)),
      lowerBands: data.map((item) => Number(item.lowerBand)),
      middleBands: data.map((item) => Number(item.middleBand)),
      ma5: data.map((item) => (item.ma5 ? Number(item.ma5) : null)),
      ma20: data.map((item) => (item.ma20 ? Number(item.ma20) : null)),
      rsi: data.map((item) => (item.rsi ? Number(item.rsi) : null)),
      obv: data.map((item) => (item.obv ? Number(item.obv) : null)),
      macd: data.map((item) => (item.macd ? Number(item.macd) : null)),
      signal: data.map((item) => (item.signal ? Number(item.signal) : null)),
    };
  }, [data]);

  const series = useMemo(() => {
    const list: any[] = [
      {
        name: 'Price',
        type: 'candlestick',
        data: chartData.candleData,
        itemStyle: {
          color: '#e23d29',
          color0: '#1e75d0',
          borderColor: '#e23d29',
          borderColor0: '#1e75d0',
        },
        tooltip: {
          valueFormatter: (value: any) => {
            if (Array.isArray(value)) {
              return value.map((v) => Math.round(Number(v)).toLocaleString()).join(', ');
            }
            return Math.round(Number(value)).toLocaleString();
          },
        },
      },
    ];

    let currentGridIndex = 1;

    if (activeOverlays.volume) {
      list.push({
        name: 'Volume',
        type: 'bar',
        xAxisIndex: currentGridIndex,
        yAxisIndex: currentGridIndex,
        data: chartData.volumes,
        itemStyle: {
          color: (params: any) => (params.data[2] > 0 ? '#e23d29' : '#1e75d0'),
          opacity: 0.7,
        },
        tooltip: {
          valueFormatter: (value: any) => {
            const val = Array.isArray(value) ? value[1] : value;
            return Math.round(Number(val ?? 0)).toLocaleString();
          },
        },
      });
      currentGridIndex++;
    }

    if (activeOverlays.rsi) {
      list.push({
        name: 'RSI',
        type: 'line',
        xAxisIndex: currentGridIndex,
        yAxisIndex: currentGridIndex,
        data: chartData.rsi,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 1.5 },
        itemStyle: { color: '#ff7300' },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          lineStyle: { color: '#e23d29', type: 'dashed', opacity: 0.4 },
          data: [{ yAxis: 30 }, { yAxis: 70 }],
          silent: true,
        },
        tooltip: {
          valueFormatter: (value: number) => value.toFixed(2),
        },
      });
      currentGridIndex++;
    }

    if (activeOverlays.obv) {
      list.push({
        name: 'OBV',
        type: 'line',
        xAxisIndex: currentGridIndex,
        yAxisIndex: currentGridIndex,
        data: chartData.obv,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 1.5 },
        itemStyle: { color: '#8884d8' },
        tooltip: {
          valueFormatter: (value: number) => Math.round(value).toLocaleString(),
        },
      });
      currentGridIndex++;
    }

    if (activeOverlays.macd) {
      list.push(
        {
          name: 'MACD',
          type: 'line',
          xAxisIndex: currentGridIndex,
          yAxisIndex: currentGridIndex,
          data: chartData.macd,
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 1.5 },
          itemStyle: { color: '#ff1493' },
          tooltip: {
            valueFormatter: (value: number) => value.toFixed(2),
          },
        },
        {
          name: 'Signal',
          type: 'line',
          xAxisIndex: currentGridIndex,
          yAxisIndex: currentGridIndex,
          data: chartData.signal,
          smooth: true,
          showSymbol: false,
          lineStyle: { width: 1.5, type: 'dashed' },
          itemStyle: { color: '#00ced1' },
          tooltip: {
            valueFormatter: (value: number) => value.toFixed(2),
          },
        },
      );
      currentGridIndex++;
    }

    if (activeOverlays.bb) {
      list.push(
        {
          name: 'Upper Band',
          type: 'line',
          data: chartData.upperBands,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.5, width: 1, type: 'dashed' },
          itemStyle: { color: '#8884d8' },
          tooltip: {
            valueFormatter: (value: number) => value.toFixed(2),
          },
        },
        {
          name: 'Lower Band',
          type: 'line',
          data: chartData.lowerBands,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.5, width: 1, type: 'dashed' },
          itemStyle: { color: '#8884d8' },
          tooltip: {
            valueFormatter: (value: number) => value.toFixed(2),
          },
        },
        {
          name: 'Middle Band',
          type: 'line',
          data: chartData.middleBands,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.3, width: 1 },
          itemStyle: { color: '#8884d8' },
          tooltip: {
            valueFormatter: (value: number) => value.toFixed(2),
          },
        },
      );
    }

    if (activeOverlays.ma5) {
      list.push({
        name: 'MA5',
        type: 'line',
        data: chartData.ma5,
        smooth: true,
        showSymbol: false,
        lineStyle: { opacity: 0.8, width: 1 },
        itemStyle: { color: '#f0ad4e' },
        tooltip: {
          valueFormatter: (value: number) => Math.round(value).toLocaleString(),
        },
      });
    }

    if (activeOverlays.ma20) {
      list.push({
        name: 'MA20',
        type: 'line',
        data: chartData.ma20,
        smooth: true,
        showSymbol: false,
        lineStyle: { opacity: 0.8, width: 1 },
        itemStyle: { color: '#5bc0de' },
        tooltip: {
          valueFormatter: (value: number) => Math.round(value).toLocaleString(),
        },
      });
    }

    return list;
  }, [chartData, activeOverlays]);

  const { mode, tokens } = useTheme();

  const option = useMemo(() => {
    const subCharts = [
      { key: 'volume', name: 'Volume' },
      { key: 'rsi', name: 'RSI' },
      { key: 'obv', name: 'OBV' },
      { key: 'macd', name: 'MACD' },
    ].filter((sc) => activeOverlays[sc.key as keyof Overlays]);

    const activeSubCount = subCharts.length;
    const spacing = 3; // reduced space between price and first sub-chart
    const subChartGap = 2; // gap between sub-charts
    const subChartHeight =
      activeSubCount > 0 ? (activeSubCount === 1 ? 20 : activeSubCount === 2 ? 15 : 10) : 0;
    const priceHeight =
      85 -
      (activeSubCount > 0
        ? spacing + activeSubCount * subChartHeight + (activeSubCount - 1) * subChartGap
        : 0);

    const grids: any[] = [
      {
        left: '3%',
        right: '8%',
        top: '5%',
        height: `${priceHeight}%`,
      },
    ];

    const xAxes: any[] = [
      {
        type: 'category',
        data: chartData.dates,
        boundaryGap: true,
        axisLine: {
          onZero: false,
          lineStyle: { color: tokens.foreground.fg3 },
        },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          z: 100,
          label: {
            show: activeSubCount === 0,
            backgroundColor: tokens.background.bg3,
            color: tokens.foreground.fg1,
          }, // Only show label if it's the bottom chart
        },
        axisLabel: {
          show: activeSubCount === 0,
          color: tokens.foreground.fg3,
        },
      },
    ];

    const yAxes: any[] = [
      {
        scale: true,
        position: 'right',
        boundaryGap: ['10%', '10%'],
        splitArea: {
          show: true,
          areaStyle: {
            color:
              mode === 'light'
                ? ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.1)']
                : ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)'],
          },
        },
        axisLabel: {
          formatter: (value: number) => Math.round(value).toLocaleString(),
          color: tokens.foreground.fg3,
        },
        axisLine: {
          lineStyle: { color: tokens.foreground.fg3 },
        },
        splitLine: {
          lineStyle: { color: tokens.background.bg3, opacity: 0.5 },
        },
      },
    ];

    let currentTop = 5 + priceHeight + spacing;

    subCharts.forEach((sc, idx) => {
      grids.push({
        left: '3%',
        right: '8%',
        top: `${currentTop}%`,
        height: `${subChartHeight}%`,
      });

      const isBottom = idx === activeSubCount - 1;

      xAxes.push({
        type: 'category',
        gridIndex: idx + 1,
        data: chartData.dates,
        boundaryGap: true,
        axisLine: {
          onZero: false,
          lineStyle: { color: tokens.foreground.fg3 },
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisPointer: {
          label: {
            show: isBottom,
            backgroundColor: tokens.background.bg3,
            color: tokens.foreground.fg1,
          }, // Only show label if it's the bottom chart
        },
        axisLabel: {
          show: isBottom,
          color: tokens.foreground.fg3,
        },
        min: 'dataMin',
        max: 'dataMax',
      });

      if (sc.key === 'volume') {
        yAxes.push({
          scale: true,
          gridIndex: idx + 1,
          position: 'right',
          splitNumber: 2,
          axisLabel: {
            color: tokens.foreground.fg3,
            formatter: (value: number) =>
              value >= 1000000
                ? `${Math.round(value / 1000000)}M`
                : Math.round(value).toLocaleString(),
          },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine: {
            lineStyle: { color: tokens.foreground.fg3 },
          },
        });
      } else if (sc.key === 'rsi') {
        yAxes.push({
          scale: false,
          gridIndex: idx + 1,
          position: 'right',
          min: 0,
          max: 100,
          interval: 10,
          axisLabel: {
            fontSize: 10,
            color: tokens.foreground.fg3,
            formatter: (value: number) => (value === 30 || value === 70 ? value : ''),
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: {
            lineStyle: { color: tokens.foreground.fg3 },
          },
        });
      } else if (sc.key === 'obv') {
        yAxes.push({
          scale: true,
          gridIndex: idx + 1,
          position: 'right',
          splitNumber: 2,
          axisLabel: {
            fontSize: 10,
            color: tokens.foreground.fg3,
            formatter: (value: number) =>
              value >= 1000000
                ? `${(value / 1000000).toFixed(1)}M`
                : Math.round(value).toLocaleString(),
          },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLine: {
            lineStyle: { color: tokens.foreground.fg3 },
          },
        });
      } else {
        // MACD
        yAxes.push({
          scale: true,
          gridIndex: idx + 1,
          position: 'right',
          splitNumber: 2,
          axisLabel: {
            fontSize: 10,
            color: tokens.foreground.fg3,
          },
          axisTick: { show: false },
          splitLine: {
            show: true,
            lineStyle: { type: 'dashed', opacity: 0.2, color: tokens.background.bg3 },
          },
          axisLine: {
            lineStyle: { color: tokens.foreground.fg3 },
          },
        });
      }

      currentTop += subChartHeight + subChartGap;
    });

    const xAxisIndices = Array.from({ length: activeSubCount + 1 }, (_, i) => i);

    return {
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' },
        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(30, 41, 59, 0.9)',
        borderWidth: 1,
        borderColor: tokens.background.bg3,
        padding: 10,
        textStyle: { color: tokens.foreground.fg1 },
        position: (pos: any, params: any, el: any, elRect: any, size: any) => {
          const tooltipWidth = elRect?.width || 200;
          const xPos = pos[0];
          const viewWidth = size.viewSize[0];

          let left = xPos + 20;
          if (left + tooltipWidth > viewWidth) {
            left = xPos - tooltipWidth - 20;
          }

          return { top: 10, left };
        },
        formatter: (params: any) => {
          const candle = params.find((p: any) => p.seriesName === 'Price');
          let result = '';

          if (candle) {
            const date = candle.name;
            const values = candle.data;
            // Handle data with or without index
            const hasIndex = values.length > 4;
            const open = hasIndex ? values[1] : values[0];
            const close = hasIndex ? values[2] : values[1];
            const low = hasIndex ? values[3] : values[2];
            const high = hasIndex ? values[4] : values[3];

            result += `<div style="font-weight: 600; margin-bottom: 4px;">${date}</div>`;
            result += `
              <div style="display: flex; justify-content: space-between; gap: 20px;">
                <span>시가:</span> <b>${Math.round(Number(open)).toLocaleString()}</b>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 20px;">
                <span>종가:</span> <b>${Math.round(Number(close)).toLocaleString()}</b>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 20px;">
                <span>고가:</span> <b>${Math.round(Number(high)).toLocaleString()}</b>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 20px;">
                <span>저가:</span> <b>${Math.round(Number(low)).toLocaleString()}</b>
              </div>
              ${params.length > 1 ? '<div style="margin: 4px 0; border-bottom: 1px solid var(--imspdr-background-bg3); opacity: 0.3;"></div>' : ''}
            `;
          } else if (params[0]) {
            result += `<div style="font-weight: 600; margin-bottom: 4px;">${params[0].name}</div>`;
          }

          params.forEach((p: any) => {
            if (p.seriesName !== 'Price') {
              let val = p.value;
              if (Array.isArray(val)) {
                val = val[1];
              }

              if (val === null || val === undefined) return;

              let formattedVal = val;
              if (typeof val === 'number') {
                if (p.seriesName === 'Volume') {
                  formattedVal = Math.round(val).toLocaleString();
                } else {
                  formattedVal = val.toLocaleString(undefined, { maximumFractionDigits: 2 });
                }
              }

              result += `
              <div style="display: flex; justify-content: space-between; gap: 20px; align-items: center;">
                <span style="font-size: 12px;">${p.marker} ${p.seriesName}</span>
                <b style="font-size: 12px;">${formattedVal}</b>
              </div>
              `;
            }
          });

          return result;
        },
      },
      axisPointer: {
        link: [{ xAxisIndex: 'all' }],
        label: { backgroundColor: tokens.background.bg3, color: tokens.foreground.fg1 },
      },
      grid: grids,
      xAxis: xAxes,
      yAxis: yAxes,
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: xAxisIndices,
          start: 70,
          end: 100,
        },
        {
          show: true,
          xAxisIndex: xAxisIndices,
          type: 'slider',
          top: '92%',
          start: 70,
          end: 100,
          backgroundColor: mode === 'light' ? '#fff' : tokens.background.bg2,
          borderColor: tokens.background.bg3,
          textStyle: { color: tokens.foreground.fg3 },
          handleStyle: { color: tokens.background.bg3 },
        },
      ],
      series,
    };
  }, [chartData.dates, series, activeOverlays, chartData.signal, chartData.macd, mode, tokens]);

  const toggleOverlay = (key: keyof Overlays) => {
    setActiveOverlays((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (data.length === 0) {
    return (
      <ChartContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          No Data Available
        </div>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <OverlayControls>
        <Button
          variant={activeOverlays.volume ? 'box' : 'outlined'}
          onClick={() => toggleOverlay('volume')}
          style={{ padding: '4px 8px', fontSize: '11px', height: 'unset', fontWeight: 500 }}
        >
          Vol
        </Button>
        <Button
          variant={activeOverlays.rsi ? 'box' : 'outlined'}
          onClick={() => toggleOverlay('rsi')}
          style={{ padding: '4px 8px', fontSize: '11px', height: 'unset', fontWeight: 500 }}
        >
          RSI
        </Button>
        <Button
          variant={activeOverlays.obv ? 'box' : 'outlined'}
          onClick={() => toggleOverlay('obv')}
          style={{ padding: '4px 8px', fontSize: '11px', height: 'unset', fontWeight: 500 }}
        >
          OBV
        </Button>
        <Button
          variant={activeOverlays.macd ? 'box' : 'outlined'}
          onClick={() => toggleOverlay('macd')}
          style={{ padding: '4px 8px', fontSize: '11px', height: 'unset', fontWeight: 500 }}
        >
          MACD
        </Button>
        <Button
          variant={activeOverlays.bb ? 'box' : 'outlined'}
          onClick={() => toggleOverlay('bb')}
          style={{ padding: '4px 8px', fontSize: '11px', height: 'unset', fontWeight: 500 }}
        >
          BB
        </Button>
        <Button
          variant={activeOverlays.ma5 ? 'box' : 'outlined'}
          onClick={() => toggleOverlay('ma5')}
          style={{ padding: '4px 8px', fontSize: '11px', height: 'unset', fontWeight: 500 }}
        >
          MA5
        </Button>
        <Button
          variant={activeOverlays.ma20 ? 'box' : 'outlined'}
          onClick={() => toggleOverlay('ma20')}
          style={{ padding: '4px 8px', fontSize: '11px', height: 'unset', fontWeight: 500 }}
        >
          MA20
        </Button>
      </OverlayControls>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge={true} />
    </ChartContainer>
  );
};
