import { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useDeviceType } from '@imspdr/ui';
import { StockChart } from '../../components/StockChart';
import { useStockDetail } from '../../hooks/useKospiData';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { DetailHeader } from '../../components/DetailHeader';
import { NewsSection } from '../../components/NewsSection';
import { SimpleStockChart } from '../../components/SimpleStockChart';
import { Container, LeftColumn, RightColumn, MobileContainer, ChartWrapper } from './styled';

export const DetailPage: FC = () => {
  const { code } = useParams<{ code: string }>();
  const { isPc } = useDeviceType();
  const { data: stock, isLoading } = useStockDetail(code || null);
  const { addRecentView } = useRecentlyViewed([]);

  useEffect(() => {
    if (code) {
      addRecentView(code);
    }
  }, [code, addRecentView]);

  if (isLoading) {
    return (
      <div style={{ padding: '24px' }}>
        <Typography>Loading...</Typography>
      </div>
    );
  }

  if (!stock) {
    return (
      <div style={{ padding: '24px' }}>
        <Typography>Stock not found</Typography>
      </div>
    );
  }

  const lastAnalysis = stock.analysis[stock.analysis.length - 1];
  const prevAnalysis = stock.analysis[stock.analysis.length - 2];

  const todayPrice = stock.today || lastAnalysis.end;
  const lastPrice = stock.last || prevAnalysis.end;
  const changePercent = ((todayPrice - lastPrice) / lastPrice) * 100;

  if (isPc) {
    return (
      <Container>
        <LeftColumn>
          <DetailHeader
            name={stock.name}
            code={stock.code}
            todayPrice={todayPrice}
            changePercent={changePercent}
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
        todayPrice={todayPrice}
        changePercent={changePercent}
      />
      <ChartWrapper>
        <SimpleStockChart data={stock.analysis} />
      </ChartWrapper>
      <NewsSection news={stock.news} />
    </MobileContainer>
  );
};
