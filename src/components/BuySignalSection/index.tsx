import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useStocks } from '../../hooks/useKospiData';
import { useDisplayStocks } from '../../hooks/useDisplayStocks';
import { StockCard } from '../StockCard';
import { LoadingContainer, SectionTitle, StockGrid } from './styled';

export const BuySignalSection: FC = () => {
  const navigate = useNavigate();
  const { data: stocks } = useStocks();
  const { buySignalStocks } = useDisplayStocks(stocks ?? []);

  const handleStockSelect = (code: string) => {
    navigate(`/detail/${code}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SectionTitle variant="title" level={2}>
        매수 신호 종목
      </SectionTitle>
      {buySignalStocks.length === 0 ? (
        <LoadingContainer>
          <Typography variant="body" level={2} color="foreground.3">
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
    </div>
  );
};
