import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import {
  CardContainer,
  RankBadge,
  PriceInfo,
  ChangeLabel,
  SignalTagsContainer,
  SignalTag,
  TopSection,
  TitleWrapper,
} from './styled';

interface StockCardProps {
  name: string;
  code: string;
  today: number;
  last: number;
  rank?: number;
  signals?: string[];
  onClick: () => void;
}

export const StockCard: FC<StockCardProps> = ({ name, today, last, rank, signals, onClick }) => {
  const isRising = today > last;
  const change = today - last;
  const changePercent = (change / last) * 100;

  return (
    <CardContainer onClick={onClick}>
      {rank !== undefined && <RankBadge rank={rank}>{rank}</RankBadge>}

      <TopSection>
        <TitleWrapper>
          <Typography variant="title" level={3}>
            {name}
          </Typography>
          <PriceInfo>
            <Typography variant="body" level={1} style={{ fontWeight: 600 }}>
              {today.toLocaleString()}원
            </Typography>
            <ChangeLabel isRising={isRising} variant="caption">
              {isRising ? '▲' : '▼'} {Math.abs(change).toLocaleString()} (
              {Math.abs(changePercent).toFixed(1)}
              %)
            </ChangeLabel>
          </PriceInfo>
        </TitleWrapper>

        {signals && signals.length > 0 && (
          <SignalTagsContainer>
            {signals.map((signal, i) => (
              <SignalTag key={i}>{signal}</SignalTag>
            ))}
          </SignalTagsContainer>
        )}
      </TopSection>
    </CardContainer>
  );
};
