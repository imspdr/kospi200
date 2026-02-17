import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useDeviceType } from '@imspdr/ui';
import { useStocks } from '@/hooks/useKospiData';
import { FlexColumn, LoadingContainer, PageContainer, SectionTitleWrapper } from './styled';
import { TopRankingSection } from '@/components/TopRankingSection';
import { BuySignalSection } from '@/pages/ListPage/components/BuySignalSection';
import { MobileList } from '@/pages/ListPage/components/MobileList';

const ListPage: FC = () => {
  const navigate = useNavigate();
  const { isPc } = useDeviceType();
  const { isLoading, isError } = useStocks();

  const handleStockSelect = (code: string) => {
    navigate(`/detail/${code}`);
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <Typography variant="body" level={1} bold>
          데이터를 불러오는 중입니다...
        </Typography>
      </LoadingContainer>
    );
  }

  if (isError) {
    return (
      <LoadingContainer>
        <Typography variant="body" level={1} color="danger.1" bold>
          데이터를 불러오는 중 오류가 발생했습니다.
        </Typography>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      {isPc ? (
        <>
          <TopRankingSection limit={10} onStockSelect={handleStockSelect} />

          <FlexColumn>
            <BuySignalSection />
          </FlexColumn>
        </>
      ) : (
        <MobileList />
      )}
    </PageContainer>
  );
};

export default ListPage;
