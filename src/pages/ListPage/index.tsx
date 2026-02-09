import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import { useDeviceType } from '@imspdr/ui';
import { useStocks } from '@/hooks/useKospiData';
import { FlexColumn, LoadingContainer, PageContainer } from './styled';
import { Top10Section } from '@/pages/ListPage/components/Top10Section';
import { BuySignalSection } from '@/pages/ListPage/components/BuySignalSection';
import { MobileList } from '@/pages/ListPage/components/MobileList';

const ListPage: FC = () => {
  const { isPc } = useDeviceType();
  const { isLoading, isError } = useStocks();

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
          <Top10Section />
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
