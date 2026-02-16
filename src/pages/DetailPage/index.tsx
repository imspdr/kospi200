import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useDeviceType } from '@imspdr/ui';
import { StockChart } from './components/StockChart';
import { useStockDetailPage } from './hooks/useStockDetailPage';
import { DetailHeader } from './components/DetailHeader';
import { NewsSection } from './components/NewsSection';
import { MobileNewsTicker } from './components/MobileNewsTicker';
import { MobileDetailHeader } from './components/MobileDetailHeader';
import { MobileStockChart } from './components/MobileStockChart';
import { Container, LeftColumn, RightColumn, MobileContainer, ChartWrapper, MessageWrapper, MobileChartWrapper } from './styled';

export const DetailPage: FC = () => {
  const { code } = useParams<{ code: string }>();
  const { isPc } = useDeviceType();
  const { stock, isLoading, isError, todayPrice, changePercent } = useStockDetailPage(code);

  if (isLoading) {
    return (
      <MessageWrapper>
        <Typography variant="body" level={2} color="foreground.2">
          데이터를 불러오는 중입니다...
        </Typography>
      </MessageWrapper>
    );
  }

  if (isError) {
    return (
      <MessageWrapper>
        <Typography variant="body" level={2} color="danger.1">
          데이터를 불러오는 중 오류가 발생했습니다.
        </Typography>
      </MessageWrapper>
    );
  }

  if (!stock) {
    return (
      <MessageWrapper>
        <Typography variant="body" level={2} color="foreground.2">
          주식 정보를 찾을 수 없습니다.
        </Typography>
      </MessageWrapper>
    );
  }



  if (isPc) {
    return (
      <Container>
        <LeftColumn>
          <DetailHeader
            name={stock.name}
            code={stock.code}
            todayPrice={todayPrice || 0}
            changePercent={changePercent || 0}
          />
          <NewsSection news={stock.news} />
        </LeftColumn>

        <RightColumn>
          <StockChart data={stock.analysis} />
        </RightColumn>
      </Container>
    );
  }

  return (
    <MobileContainer>
      <MobileDetailHeader
        name={stock.name}
        code={stock.code}
        todayPrice={todayPrice || 0}
        changePercent={changePercent || 0}
      />
      <MobileNewsTicker news={stock.news} />
      <MobileChartWrapper>
        <MobileStockChart data={stock.analysis} />
      </MobileChartWrapper>
    </MobileContainer>
  );
};
