import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useStocks } from '../../hooks/useKospiData';
import { useDisplayStocks } from '../../hooks/useDisplayStocks';
import { ChangeLabel } from '../StockCard/styled';
import {
  Container,
  Info,
  ListItem,
  ListWrapper,
  MobileTitle,
  PriceRow,
  Rank,
  Section,
  StockName,
  TextContent,
} from './styled';

export const MobileList: FC = () => {
  const navigate = useNavigate();
  const { data: stocks } = useStocks();
  const { top10Codes, buySignalStocks } = useDisplayStocks(stocks ?? []);

  const handleStockSelect = (code: string) => {
    navigate(`/detail/${code}`);
  };

  return (
    <Container>
      {/* Top 10 Section */}
      <Section>
        <MobileTitle variant="title">상위 10개 변동 종목</MobileTitle>
        <ListWrapper>
          {top10Codes.map((code, index) => {
            const stock = stocks?.find((s) => s.code === code);
            if (!stock) return null;

            const isRising = stock.today > stock.last;
            const change = stock.today - stock.last;
            const changePercent = (change / stock.last) * 100;

            return (
              <ListItem key={stock.code} onClick={() => handleStockSelect(stock.code)}>
                <Rank isTop={index < 3}>{index + 1}</Rank>
                <Info>
                  <TextContent>
                    <StockName variant="body" level={1}>
                      {stock.name}
                    </StockName>
                  </TextContent>
                  <PriceRow>
                    <Typography variant="body" level={2} style={{ fontWeight: 500 }}>
                      {stock.today.toLocaleString()}
                    </Typography>
                    <ChangeLabel
                      isRising={isRising}
                      variant="caption"
                      style={{ minWidth: '60px', justifyContent: 'flex-end' }}
                    >
                      {isRising ? '▲' : '▼'} {Math.abs(changePercent).toFixed(1)}%
                    </ChangeLabel>
                  </PriceRow>
                </Info>
              </ListItem>
            );
          })}
        </ListWrapper>
      </Section>

      {/* Buy Signals Section */}
      <Section>
        <MobileTitle variant="title">매수 신호 종목</MobileTitle>
        <ListWrapper>
          {buySignalStocks.length > 0 ? (
            buySignalStocks.map((stock) => {
              const isRising = stock.today > stock.last;
              const change = stock.today - stock.last;
              const changePercent = (change / stock.last) * 100;

              return (
                <ListItem key={stock.code} onClick={() => handleStockSelect(stock.code)}>
                  <Info>
                    <TextContent>
                      <StockName variant="body" level={1}>
                        {stock.name}
                      </StockName>
                    </TextContent>
                    <PriceRow>
                      <Typography variant="body" level={2} style={{ fontWeight: 500 }}>
                        {stock.today.toLocaleString()}
                      </Typography>
                      <ChangeLabel
                        isRising={isRising}
                        variant="caption"
                        style={{ minWidth: '60px', justifyContent: 'flex-end' }}
                      >
                        {isRising ? '▲' : '▼'} {Math.abs(changePercent).toFixed(1)}%
                      </ChangeLabel>
                    </PriceRow>
                  </Info>
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <Typography
                variant="body"
                level={2}
                style={{ color: '#999', width: '100%', textAlign: 'center' }}
              >
                현재 매수 신호가 없습니다.
              </Typography>
            </ListItem>
          )}
        </ListWrapper>
      </Section>
    </Container>
  );
};
