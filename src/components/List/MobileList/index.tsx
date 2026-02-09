import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useStocks } from '@/hooks/useKospiData';
import { useDisplayStocks } from '@/hooks/useDisplayStocks';
import {
  Container,
  Info,
  ListItem,
  ListWrapper,
  MobileTitleWrapper,
  PriceRow,
  Rank,
  Section,
  StockNameWrapper,
  TextContent,
  ChangeLabelWrapper,
  EmptyMessageWrapper,
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
        <MobileTitleWrapper>
          <Typography variant="title" level={4} color="foreground.1" bold>
            상위 10개 변동 종목
          </Typography>
        </MobileTitleWrapper>
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
                    <StockNameWrapper>
                      <Typography variant="body" level={1} color="foreground.1" bold>
                        {stock.name}
                      </Typography>
                    </StockNameWrapper>
                  </TextContent>
                  <PriceRow>
                    <Typography variant="body" level={2} color="foreground.1" bold>
                      {stock.today.toLocaleString()}
                    </Typography>
                    <ChangeLabelWrapper isRising={isRising}>
                      <Typography variant="caption" color={isRising ? 'danger.1' : 'info.1'} bold>
                        {isRising ? '▲' : '▼'} {Math.abs(changePercent).toFixed(1)}%
                      </Typography>
                    </ChangeLabelWrapper>
                  </PriceRow>
                </Info>
              </ListItem>
            );
          })}
        </ListWrapper>
      </Section>

      {/* Buy Signals Section */}
      <Section>
        <MobileTitleWrapper>
          <Typography variant="title" level={4} color="foreground.1" bold>
            매수 신호 종목
          </Typography>
        </MobileTitleWrapper>
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
                      <StockNameWrapper>
                        <Typography variant="body" level={1} color="foreground.1" bold>
                          {stock.name}
                        </Typography>
                      </StockNameWrapper>
                    </TextContent>
                    <PriceRow>
                      <Typography variant="body" level={2} color="foreground.1" bold>
                        {stock.today.toLocaleString()}
                      </Typography>
                      <ChangeLabelWrapper isRising={isRising}>
                        <Typography variant="caption" color={isRising ? 'danger.1' : 'info.1'} bold>
                          {isRising ? '▲' : '▼'} {Math.abs(changePercent).toFixed(1)}%
                        </Typography>
                      </ChangeLabelWrapper>
                    </PriceRow>
                  </Info>
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <EmptyMessageWrapper>
                <Typography variant="body" level={2} color="foreground.3">
                  현재 매수 신호가 없습니다.
                </Typography>
              </EmptyMessageWrapper>
            </ListItem>
          )}
        </ListWrapper>
      </Section>
    </Container>
  );
};
