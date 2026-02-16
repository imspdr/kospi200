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

export interface Top10SectionProps {
  onStockSelect?: (code: string) => void;
}

export const Top10Section: FC<Top10SectionProps> = ({ onStockSelect }) => {
  const { data: stocks } = useStocks();
  const { top10Codes } = useDisplayStocks(stocks ?? []);

  const handleStockSelect = (code: string) => {
    onStockSelect?.(code);
  };

  return (
    <CompactStockList>
      {top10Codes.map((code, index) => {
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
                color={index < 3 ? 'primary.1' : 'foreground.3'}
                as="span"
                bold
              >
                {index + 1}
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
