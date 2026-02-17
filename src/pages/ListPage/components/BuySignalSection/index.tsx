import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useStocks } from '@/hooks/useKospiData';
import { StockCard } from './StockCard';
import { LoadingContainer, StockGrid, Container } from './styled';

export const BuySignalSection: FC = () => {
  const navigate = useNavigate();
  const { data: stocks } = useStocks();

  const sortedStocks = useMemo(() => {
    if (!stocks) return [];
    return [...stocks].sort((a, b) => {
      const aHasSignal = a.toBuy && a.toBuy.length > 0;
      const bHasSignal = b.toBuy && b.toBuy.length > 0;
      if (aHasSignal && !bHasSignal) return -1;
      if (!aHasSignal && bHasSignal) return 1;
      return 0;
    });
  }, [stocks]);

  const handleStockSelect = (code: string) => {
    navigate(`/detail/${code}`);
  };

  if (!stocks) {
    return (
      <LoadingContainer>
        <Typography variant="body" level={2} color="foreground.3" bold>
          데이터를 불러오는 중...
        </Typography>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <StockGrid>
        {sortedStocks.map((stock) => (
          <StockCard
            key={stock.code}
            name={stock.name}
            code={stock.code}
            today={stock.today}
            last={stock.last}
            signals={stock.toBuy}
            onClick={() => handleStockSelect(stock.code)}
          />
        ))}
      </StockGrid>
    </Container>
  );
};
