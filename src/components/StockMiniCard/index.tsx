import { FC, MouseEvent } from 'react';

import { Typography } from '@imspdr/ui';
import {
  BottomRow,
  CardContainer,
  ChangeWrapper,
  FoldedIconWrapper,
  NameSection,
  SignalDot,
  SignalTag,
  StarButton,
  StockNameWrapper,
  TopRow,
} from './styled';

interface StockMiniCardProps {
  name: string;
  code: string;
  price: number;
  change: number;
  changePercent: number;
  toBuy?: string[];
  isStarred: boolean;
  onToggleStar: (e: MouseEvent) => void;
  onClick: () => void;
  isFolded: boolean;
}

export const StockMiniCard: FC<StockMiniCardProps> = ({
  name,
  code,
  price,
  change,
  changePercent,
  toBuy = [],
  isStarred,
  onToggleStar,
  onClick,
  isFolded,
}) => {
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
  const hasBuySignal = toBuy?.length > 0;

  if (isFolded) {
    return (
      <CardContainer isFolded onClick={onClick} title={name}>
        <FoldedIconWrapper>
          <Typography variant="title" level={3} color="primary.1">
            {name.substring(0, 1)}
          </Typography>
        </FoldedIconWrapper>
        {hasBuySignal && <SignalDot />}
      </CardContainer>
    );
  }

  return (
    <CardContainer onClick={onClick}>
      <TopRow>
        <NameSection>
          <StarButton
            isStarred={isStarred}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(e);
            }}
          >
            {isStarred ? '★' : '☆'}
          </StarButton>
          <StockNameWrapper>
            <Typography variant="body" level={2} color="foreground.1">
              {name}
            </Typography>
          </StockNameWrapper>
        </NameSection>
        {hasBuySignal &&
          toBuy?.map((signal) => (
            <SignalTag key={signal}>
              <Typography variant="caption" color="white" as="span">
                {signal}
              </Typography>
            </SignalTag>
          ))}
      </TopRow>
      <BottomRow>
        <Typography variant="body" level={2} color="foreground.1">
          {price.toLocaleString()}원
        </Typography>
        <ChangeWrapper trend={trend}>
          <Typography
            variant="caption"
            color={trend === 'up' ? 'danger.1' : trend === 'down' ? 'info.1' : 'foreground.3'}
          >
            {trend === 'flat'
              ? '-'
              : `${trend === 'up' ? '▲' : '▼'} ${Math.abs(change).toLocaleString()} (${changePercent.toFixed(1)}%)`}
          </Typography>
        </ChangeWrapper>
      </BottomRow>
    </CardContainer>
  );
};
