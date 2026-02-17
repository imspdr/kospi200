import React, { useMemo } from 'react';
import { Typography } from '@imspdr/ui';
import { useStocks } from '@/hooks/useKospiData';
import { WidgetContainer, InfoWrapper } from './styled';

const MiniStockWidget = () => {
  const { data: stocks, isLoading } = useStocks();

  const topStock = useMemo(() => {
    if (!stocks || stocks.length === 0) return null;
    return [...stocks].sort((a, b) => b.changePercent - a.changePercent)[0];
  }, [stocks]);

  const handleClick = () => {
    window.location.href = 'https://imspdr.github.io/kospi200';
  };

  if (isLoading || !topStock) {
    return (
      <WidgetContainer onClick={handleClick}>
        <Typography variant="caption" color="foreground.3" level={6}>
          K200
        </Typography>
      </WidgetContainer>
    );
  }

  const isPositive = topStock.changePercent > 0;
  const colorToken = isPositive ? 'danger.1' : topStock.changePercent < 0 ? 'info.1' : 'foreground.2';

  return (
    <WidgetContainer onClick={handleClick}>
      <InfoWrapper>
        <Typography
          variant="body"
          level={3}
          bold
          color="foreground.1"
        >
          {topStock.name}
        </Typography>
        <Typography
          variant="body"
          level={3}
          bold
          color={colorToken}
        >
          {isPositive ? '+' : ''}{topStock.changePercent.toFixed(2)}%
        </Typography>
        <Typography
          variant="caption"
          level={2}
          color="foreground.3"
        >
          KOSPI 200
        </Typography>
      </InfoWrapper>
    </WidgetContainer>
  );
};

export default MiniStockWidget;
