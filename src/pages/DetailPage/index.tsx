import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useDeviceType } from '@imspdr/ui';
import { StockChart } from '../../components/StockChart';
import { useStockDetailPage } from '../../hooks/useStockDetailPage';
import { DetailHeader } from '../../components/DetailHeader';
import { NewsSection } from '../../components/NewsSection';
import { SimpleStockChart } from '../../components/SimpleStockChart';
import { Container, LeftColumn, RightColumn, MobileContainer, ChartWrapper } from './styled';

export const DetailPage: FC = () => {
  const { code } = useParams<{ code: string }>();
  const { isPc } = useDeviceType();
  const { stock, isLoading, isError, todayPrice, changePercent } = useStockDetailPage(code);

  if (isLoading) {
    return (
      <div style={{ padding: '24px' }}>
        <Typography>데이터를 불러오는 중입니다...</Typography>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '24px' }}>
        <Typography style={{ color: 'red' }}>데이터를 불러오는 중 오류가 발생했습니다.</Typography>
      </div>
    );
  }

  if (!stock) {
    return (
      <div style={{ padding: '24px' }}>
        <Typography>주식 정보를 찾을 수 없습니다.</Typography>
      </div>
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
      <DetailHeader
        name={stock.name}
        code={stock.code}
        todayPrice={todayPrice || 0}
        changePercent={changePercent || 0}
      />
      <ChartWrapper>
        <SimpleStockChart data={stock.analysis} />
      </ChartWrapper>
      <NewsSection news={stock.news} />
    </MobileContainer>
  );
};
