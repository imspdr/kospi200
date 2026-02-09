import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useStocks } from '../../hooks/useKospiData';
import { useDisplayStocks } from '../../hooks/useDisplayStocks';
import {
  CompactInfo,
  CompactStockItem,
  CompactStockList,
  RankNumberWrapper,
  SectionTitleWrapper,
  ValueSection,
  ChangeLabelWrapper,
} from './styled';

export const Top10Section: FC = () => {
  const navigate = useNavigate();
  const { data: stocks } = useStocks();
  const { top10Codes } = useDisplayStocks(stocks ?? []);

  const handleStockSelect = (code: string) => {
    navigate(`/detail/${code}`);
  };

  return (
    <div>
      <SectionTitleWrapper>
        <Typography variant="title" level={4} color="foreground.1" bold>
          상위 10개 변동 종목
        </Typography>
      </SectionTitleWrapper>
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
    </div>
  );
};
