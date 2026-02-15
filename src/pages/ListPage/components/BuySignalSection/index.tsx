import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useStocks } from '@/hooks/useKospiData';
import { useDisplayStocks } from '@/hooks/useDisplayStocks';
import { StockCard } from './components/StockCard';
import { LoadingContainer, SectionTitleWrapper, StockGrid, Container } from './styled';

export const BuySignalSection: FC = () => {
  const navigate = useNavigate();
  const { data: stocks } = useStocks();
  const { buySignalStocks } = useDisplayStocks(stocks ?? []);

  const handleStockSelect = (code: string) => {
    navigate(`/detail/${code}`);
  };

  return (
    <Container>
      <SectionTitleWrapper>
        <Typography variant="title" level={4} color="foreground.1" bold>
          매수 신호 종목
        </Typography>
      </SectionTitleWrapper>
      {buySignalStocks.length === 0 ? (
        <LoadingContainer>
          <Typography variant="body" level={2} color="foreground.3" bold>
            현재 매수 신호가 있는 종목이 없습니다.
          </Typography>
        </LoadingContainer>
      ) : (
        <StockGrid>
          {buySignalStocks.map((stock) => (
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
      )}
    </Container>
  );
};
