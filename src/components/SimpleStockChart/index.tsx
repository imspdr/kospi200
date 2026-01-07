import { useTheme } from '@imspdr/ui';
import ReactECharts from 'echarts-for-react';
import { useMemo, FC } from 'react';
import { Analysis } from '../../hooks/useKospiData';
import { ChartContainer } from './styled';

interface SimpleStockChartProps {
  data: Analysis[];
}

export const SimpleStockChart: FC<SimpleStockChartProps> = ({ data }) => {
  const { mode, tokens } = useTheme();

  const chartData = useMemo(() => {
    const dates = data.map((item) => item.date);
    const candleData = data.map((item) => [
      Number(item.start),
      Number(item.end),
      Number(item.low),
      Number(item.high),
    ]);

    return {
      dates,
      candleData,
      upperBands: data.map((item) => Number(item.upperBand)),
      lowerBands: data.map((item) => Number(item.lowerBand)),
      middleBands: data.map((item) => Number(item.middleBand)),
      ma5: data.map((item) => (item.ma5 ? Number(item.ma5) : null)),
    };
  }, [data]);

  const option = useMemo(() => {
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
        formatter: (params: any) => {
          const candle = params.find((p: any) => p.seriesName === 'Price');
          if (!candle) return '';
          const date = candle.name;
          const [open, close, low, high] = candle.data;
          return `
            <div style="font-weight: 600; margin-bottom: 4px;">${date}</div>
            <div style="display: flex; justify-content: space-between; gap: 20px;">
              <span>시가:</span> <b>${Math.round(open).toLocaleString()}</b>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 20px;">
              <span>종가:</span> <b>${Math.round(close).toLocaleString()}</b>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 20px;">
              <span>고가:</span> <b>${Math.round(high).toLocaleString()}</b>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 20px;">
              <span>저가:</span> <b>${Math.round(low).toLocaleString()}</b>
            </div>
          `;
        },
      },
      grid: {
        left: '5%',
        right: '12%',
        top: '10%',
        bottom: '15%',
      },
      xAxis: {
        type: 'category',
        data: chartData.dates,
        axisLine: { lineStyle: { color: tokens.foreground.fg3 } },
        axisLabel: { color: tokens.foreground.fg3, fontSize: 10 },
      },
      yAxis: {
        scale: true,
        position: 'right',
        axisLine: { lineStyle: { color: tokens.foreground.fg3 } },
        axisLabel: {
          color: tokens.foreground.fg3,
          fontSize: 10,
          formatter: (value: number) => Math.round(value).toLocaleString(),
        },
        splitLine: { lineStyle: { color: tokens.background.bg3, opacity: 0.5 } },
      },
      series: [
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
        },
        {
          name: 'MA5',
          type: 'line',
          data: chartData.ma5,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.8, width: 1.5 },
          itemStyle: { color: '#f0ad4e' },
        },
        {
          name: 'Upper Band',
          type: 'line',
          data: chartData.upperBands,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.5, width: 1, type: 'dashed' },
          itemStyle: { color: '#8884d8' },
        },
        {
          name: 'Lower Band',
          type: 'line',
          data: chartData.lowerBands,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.5, width: 1, type: 'dashed' },
          itemStyle: { color: '#8884d8' },
        },
        {
          name: 'Middle Band',
          type: 'line',
          data: chartData.middleBands,
          smooth: true,
          showSymbol: false,
          lineStyle: { opacity: 0.3, width: 1 },
          itemStyle: { color: '#8884d8' },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 70,
          end: 100,
        },
      ],
    };
  }, [chartData, mode, tokens]);

  if (data.length === 0) {
    return <ChartContainer>No Data Available</ChartContainer>;
  }

  return (
    <ChartContainer>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} notMerge={true} />
    </ChartContainer>
  );
};
