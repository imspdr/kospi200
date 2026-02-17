import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import { TopGainerSection } from '@/components/TopGainerSection';
import { RankingList } from './components/RankingList';
import { RankingContainer, Top1Wrapper, TopListWrapper, Divider, WidgetTitle } from './styled';

export interface TopRankingSectionProps {
  onStockSelect?: (code: string) => void;
  limit?: number;
}

export const TopRankingSection: FC<TopRankingSectionProps> = ({ onStockSelect, limit = 5 }) => {
  return (
    <RankingContainer>
      <Top1Wrapper>
        <TopGainerSection onStockSelect={onStockSelect} />
      </Top1Wrapper>
      <Divider />
      <TopListWrapper>
        <RankingList limit={limit} onStockSelect={onStockSelect} />
      </TopListWrapper>
      <WidgetTitle>
        <Typography variant="caption" color="foreground.3" bold>
          변동률 순위
        </Typography>
      </WidgetTitle>
    </RankingContainer>
  );
};
