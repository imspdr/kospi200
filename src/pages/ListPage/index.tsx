import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import { useDeviceType } from '@imspdr/ui';
import { useStocks } from '../../hooks/useKospiData';
import { FlexColumn, LoadingContainer, PageContainer } from './styled';
import { Top10Section } from '../../components/Top10Section';
import { BuySignalSection } from '../../components/BuySignalSection';
import { MobileList } from '../../components/MobileList';

const ListPage: FC = () => {
  const { isPc } = useDeviceType();
  const { isLoading } = useStocks();

  if (isLoading) {
    return (
      <LoadingContainer>
        <Typography variant="body" level={1}>
          로딩 중...
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
