import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@imspdr/ui';
import { useStocks } from '../../hooks/useKospiData';
import { useDisplayStocks } from '../../hooks/useDisplayStocks';
import { ChangeLabel } from '../StockCard/styled';
import {
  CompactInfo,
  CompactStockItem,
  CompactStockList,
  RankNumber,
  SectionTitle,
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
      <SectionTitle variant="title" level={2}>
        상위 10개 변동 종목
      </SectionTitle>
      <CompactStockList>
        {top10Codes.map((code, index) => {
          const stock = stocks?.find((s) => s.code === code);
          if (!stock) return null;

          const isRising = stock.today > stock.last;
          const change = stock.today - stock.last;
          const changePercent = (change / stock.last) * 100;

          return (
            <CompactStockItem key={stock.code} onClick={() => handleStockSelect(stock.code)}>
              <RankNumber rank={index + 1}>{index + 1}</RankNumber>
              <CompactInfo>
                <Typography variant="body" level={1} style={{ fontWeight: 600 }}>
                  {stock.name}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Typography variant="body" level={2} style={{ fontWeight: 500 }}>
                    {stock.today.toLocaleString()}원
                  </Typography>
                  <ChangeLabel
                    isRising={isRising}
                    variant="caption"
                    style={{ minWidth: '70px', justifyContent: 'flex-end' }}
                  >
                    {isRising ? '▲' : '▼'} {Math.abs(changePercent).toFixed(1)}%
                  </ChangeLabel>
                </div>
              </CompactInfo>
            </CompactStockItem>
          );
        })}
      </CompactStockList>
    </div>
  );
};
