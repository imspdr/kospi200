import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import {
  CardContainer,
  RankBadge,
  PriceInfo,
  ChangeLabelWrapper,
  SignalTagsContainer,
  SignalTagWrapper,
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
          <Typography variant="title" level={6} bold>
            {name}
          </Typography>
          <PriceInfo>
            <Typography variant="title" level={5} color="foreground.1" bold>
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
        </TitleWrapper>

        {signals && signals.length > 0 && (
          <SignalTagsContainer>
            {signals.map((signal, i) => (
              <SignalTagWrapper key={i}>
                <Typography variant="caption" color="white" as="span">
                  {signal}
                </Typography>
              </SignalTagWrapper>
            ))}
          </SignalTagsContainer>
        )}
      </TopSection>
    </CardContainer>
  );
};
