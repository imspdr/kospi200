import { FC } from 'react';
import { Typography } from '@imspdr/ui';
import { useStocks } from '@/hooks/useKospiData';
import { useDisplayStocks } from '@/hooks/useDisplayStocks';
import {
  CompactInfo,
  CompactStockItem,
  CompactStockList,
  RankNumberWrapper,
  ValueSection,
  ChangeLabelWrapper,
} from './styled';

interface RankingListProps {
  limit?: number;
  onStockSelect?: (code: string) => void;
}

export const RankingList: FC<RankingListProps> = ({ limit = 5, onStockSelect }) => {
  const { data: stocks } = useStocks();
  const { top10Codes } = useDisplayStocks(stocks ?? []);

  // Top 2 ~ limit
  const rankingCodes = top10Codes.slice(1, limit);

  const handleStockSelect = (code: string) => {
    if (onStockSelect) {
      onStockSelect(code);
    } else {
      window.location.href = 'https://imspdr.github.io/kospi200';
    }
  };

  return (
    <CompactStockList>
      {rankingCodes.map((code, index) => {
        const actualRank = index + 2;
        const stock = stocks?.find((s) => s.code === code);
        if (!stock) return null;

        const isRising = stock.today > stock.last;
        const change = stock.today - stock.last;
        const changePercent = (change / stock.last) * 100;

        return (
          <CompactStockItem key={stock.code} onClick={() => handleStockSelect(stock.code)}>
            <RankNumberWrapper>
              <Typography
                variant="body"
                level={2}
                color={actualRank <= 3 ? 'primary.1' : 'foreground.3'}
                as="span"
                bold
              >
                {actualRank}
              </Typography>
            </RankNumberWrapper>
            <CompactInfo>
              <Typography variant="body" level={1} color="foreground.1" bold>
                {stock.name}
              </Typography>
              <ValueSection>
                <Typography variant="body" level={2} color="foreground.1" bold>
                  {stock.today.toLocaleString()}원
                </Typography>
                <ChangeLabelWrapper isRising={isRising}>
                  <Typography variant="caption" color={isRising ? 'danger.1' : 'info.1'} bold>
                    {isRising ? '▲' : '▼'} {Math.abs(changePercent).toFixed(1)}%
                  </Typography>
                </ChangeLabelWrapper>
              </ValueSection>
            </CompactInfo>
          </CompactStockItem>
        );
      })}
    </CompactStockList>
  );
};
