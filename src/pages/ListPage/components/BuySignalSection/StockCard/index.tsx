import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import {
  CardContainer,
  RankBadge,
  PriceInfo,
  ChangeLabelWrapper,
  TopSection,
  NameWrapper,
} from './styled';
import { SignalBadge } from '@/components/SignalBadge';

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
        <NameWrapper>
          <Typography variant="title" level={5}>
            {name}
          </Typography>
          {signals?.map((signal, i) => (
            <SignalBadge key={i}>
              {signal.toUpperCase()}
            </SignalBadge>
          ))}
        </NameWrapper>

        <PriceInfo>
          <Typography variant="body" level={1} color="foreground.1" bold>
            {today.toLocaleString()}원
          </Typography>
          <ChangeLabelWrapper isRising={isRising}>
            <Typography variant="caption" color={isRising ? 'danger.1' : 'info.1'}>
              {isRising ? '▲' : '▼'} {Math.abs(change).toLocaleString()} (
              {Math.abs(changePercent).toFixed(1)}
              %)
            </Typography>
          </ChangeLabelWrapper>
        </PriceInfo>
      </TopSection>
    </CardContainer>
  );
};
