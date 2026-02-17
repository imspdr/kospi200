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
          variant="caption"
          level={6}
          bold
          color="foreground.1"
          style={{
            fontSize: '10px',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}
        >
          {topStock.name}
        </Typography>
        <Typography
          variant="caption"
          level={5}
          bold
          color={colorToken}
          style={{ fontSize: '12px', lineHeight: 1 }}
        >
          {isPositive ? '+' : ''}{topStock.changePercent.toFixed(2)}%
        </Typography>
        <Typography
          variant="caption"
          level={6}
          color="foreground.3"
          style={{ fontSize: '8px', lineHeight: 1 }}
        >
          KOSPI 200
        </Typography>
      </InfoWrapper>
    </WidgetContainer>
  );
};

export default MiniStockWidget;
