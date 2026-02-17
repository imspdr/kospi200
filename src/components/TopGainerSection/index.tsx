import { FC, useMemo } from 'react';
import { Typography, useTheme } from '@imspdr/ui';
import ReactECharts from 'echarts-for-react';
import { useStocks, useStockDetail } from '@/hooks/useKospiData';
import { useDisplayStocks } from '@/hooks/useDisplayStocks';
import { MobileNewsTicker } from '@/components/MobileNewsTicker';
import {
  GainerContainer,
  HeaderArea,
  StockInfo,
  PriceArea,
  ChartWrapper,
  NewsWrapper,
  RankBadge,
  NameWrapper,
} from './styled';

export interface TopGainerSectionProps {
  onStockSelect?: (code: string) => void;
  isWidget?: boolean;
}

export const TopGainerSection: FC<TopGainerSectionProps> = ({ onStockSelect, isWidget }) => {
  const { data: stocks } = useStocks();
  const { top10Codes } = useDisplayStocks(stocks ?? []);

  const top1Code = top10Codes[0];
  const { data: stock, isLoading } = useStockDetail(top1Code || null);
  const { mode, tokens } = useTheme();

  const handleStockSelect = () => {
    if (isWidget) {
      window.location.href = `https://imspdr.github.io/kospi200`;
    } else if (onStockSelect && top1Code) {
      onStockSelect(top1Code);
    }
  };

  const handleNewsClick = () => {
    if (isWidget) {
      window.location.href = `https://imspdr.github.io/kospi200`;
    }
    // If not widget, let MobileNewsTicker handle default behavior (open link)
  };

  const chartOption = useMemo(() => {
    if (!stock?.analysis || stock.analysis.length === 0) return {};

    const data = stock.analysis.slice(-30);
    const dates = data.map(item => item.date);
    const values = data.map(item => [
      Number(item.start),
      Number(item.end),
      Number(item.low),
      Number(item.high)
    ]);

    return {
      grid: {
        top: 10,
        bottom: 10,
        left: 0,
        right: 0,
        containLabel: false
      },
      xAxis: {
        type: 'category',
        data: dates,
        show: false,
      },
      yAxis: {
        type: 'value',
        scale: true,
        show: true,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: {
            color: tokens.background[3],
            type: 'dashed',
            opacity: 0.2
          }
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: tokens.primary[1],
            width: 1,
            type: 'dashed'
          }
        },
        backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
        borderColor: tokens.background[3],
        textStyle: { color: tokens.foreground[1], fontSize: 11 },
        padding: [8, 12],
        formatter: (params: any) => {
          const p = params[0];
          const val = p.value;
          const isUp = val[2] >= val[1];
          const color = isUp ? '#e23d29' : '#1e75d0';
          return `
            <div style="font-weight: bold; margin-bottom: 4px; border-bottom: 1px solid ${tokens.background[3]}; padding-bottom: 4px;">${p.name}</div>
            <div style="display: flex; justify-content: space-between; gap: 12px; margin-top: 4px;">
              <span style="color: ${tokens.foreground[3]}">시가</span> <b style="color: ${color}">${Math.round(val[1]).toLocaleString()}</b>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 12px;">
              <span style="color: ${tokens.foreground[3]}">종가</span> <b style="color: ${color}">${Math.round(val[2]).toLocaleString()}</b>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 12px;">
              <span style="color: ${tokens.foreground[3]}">고가</span> <b>${Math.round(val[4]).toLocaleString()}</b>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 12px;">
              <span style="color: ${tokens.foreground[3]}">저가</span> <b>${Math.round(val[3]).toLocaleString()}</b>
            </div>
          `;
        }
      },
      series: [
        {
          type: 'candlestick',
          data: values,
          itemStyle: {
            color: '#e23d29',
            color0: '#1e75d0',
            borderColor: '#e23d29',
            borderColor0: '#1e75d0',
          },
          emphasis: {
            itemStyle: {
              borderWidth: 2
            }
          }
        }
      ]
    };
  }, [stock?.analysis, tokens.primary, mode]);

  if (isLoading || !stock) {
    return (
      <GainerContainer>
        <Typography variant="body" level={2} color="foreground.3">
          데이터를 불러오는 중...
        </Typography>
      </GainerContainer>
    );
  }

  const lastAnalysis = stock.analysis[stock.analysis.length - 1];
  const prevAnalysis = stock.analysis[stock.analysis.length - 2];
  const todayPrice = stock.today || lastAnalysis.end;
  const lastPrice = stock.last || prevAnalysis.end;
  const change = todayPrice - lastPrice;
  const changePercent = (change / lastPrice) * 100;
  const isRising = change > 0;

  return (
    <GainerContainer onClick={handleStockSelect} style={{ cursor: 'pointer', boxShadow: 'none' }}>
      <HeaderArea>
        <StockInfo>
          <NameWrapper>
            <RankBadge>
              <Typography variant="caption" color="white" bold>1위</Typography>
            </RankBadge>
            <Typography variant="title" level={4} color="foreground.1" bold>
              {stock.name}
            </Typography>
          </NameWrapper>
          <Typography variant="caption" color="foreground.3" style={{ paddingLeft: '34px' }}>
            {stock.code}
          </Typography>
        </StockInfo>
        <StockInfo style={{ alignItems: 'flex-end' }}>
          <PriceArea>
            <Typography variant="title" level={3} color="foreground.1" bold>
              {todayPrice.toLocaleString()}원
            </Typography>
          </PriceArea>
          <Typography variant="body" level={3} color={isRising ? 'danger.1' : 'info.1'} bold>
            {isRising ? '▲' : '▼'} {Math.abs(changePercent).toFixed(2)}%
          </Typography>
        </StockInfo>
      </HeaderArea>

      <ChartWrapper>
        <ReactECharts
          option={chartOption}
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
        />
      </ChartWrapper>

      <NewsWrapper>
        <MobileNewsTicker
          news={stock.news}
          onClick={isWidget ? handleNewsClick : undefined}
        />
      </NewsWrapper>
    </GainerContainer>
  );
};
