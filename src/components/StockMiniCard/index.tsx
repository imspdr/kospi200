import { FC, MouseEvent } from 'react';

import { Typography } from '@imspdr/ui';
import {
  BottomRow,
  CardContainer,
  Change,
  FoldedIcon,
  NameSection,
  Price,
  SignalDot,
  SignalTag,
  StarButton,
  StockName,
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
        <FoldedIcon variant="title" level={3}>
          {name.substring(0, 1)}
        </FoldedIcon>
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
          <StockName variant="body" level={2}>
            {name}
          </StockName>
        </NameSection>
        {hasBuySignal &&
          toBuy?.map((signal) => (
            <SignalTag key={signal}>
              <Typography variant="caption" style={{ fontSize: '10px', fontWeight: 700 }}>
                {signal}
              </Typography>
            </SignalTag>
          ))}
      </TopRow>
      <BottomRow>
        <Price variant="body" level={2} style={{ fontWeight: 600 }}>
          {price.toLocaleString()}원
        </Price>
        <Change variant="caption" trend={trend} style={{ fontWeight: 500 }}>
          {trend === 'flat'
            ? '-'
            : `${trend === 'up' ? '▲' : '▼'} ${Math.abs(change).toLocaleString()} (${changePercent.toFixed(1)}%)`}
        </Change>
      </BottomRow>
    </CardContainer>
  );
};
