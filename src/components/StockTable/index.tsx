import { FC } from 'react';

import { Typography } from '@imspdr/ui';
import {
  EmptyState,
  SignalBadgeWrapper,
  StarButton,
  StockNameWrapper,
  Table,
  TableContainer,
  Td,
  Th,
  Tr,
} from './styled';

export interface Stock {
  name: string;
  code: string;
  today: number;
  last: number;
  toBuy?: string[];
}

interface StockTableProps {
  stocks: Stock[];
  onStockClick: (code: string) => void;
  onToggleStar: (code: string) => void;
  isStarred: (code: string) => boolean;
  maxHeight?: string;
  emptyMessage?: string;
}

export const StockTable: FC<StockTableProps> = ({
  stocks,
  onStockClick,
  onToggleStar,
  isStarred,
  maxHeight,
  emptyMessage = '데이터가 없습니다.',
}) => {
  if (!stocks || stocks.length === 0) {
    return (
      <TableContainer maxHeight={maxHeight}>
        <EmptyState>
          <Typography variant="body" level={2} color="foreground.3">
            {emptyMessage}
          </Typography>
        </EmptyState>
      </TableContainer>
    );
  }

  return (
    <TableContainer maxHeight={maxHeight}>
      <Table>
        <thead>
          <tr>
            <Th>
              <Typography variant="body" level={2} color="foreground.2" as="span">
                종목
              </Typography>
            </Th>
            <Th>
              <Typography variant="body" level={2} color="foreground.2" as="span">
                현재가
              </Typography>
            </Th>
            <Th>
              <Typography variant="body" level={2} color="foreground.2" as="span">
                대비
              </Typography>
            </Th>
            <Th>
              <Typography variant="body" level={2} color="foreground.2" as="span">
                신호
              </Typography>
            </Th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            const changeVal = stock.today - stock.last;
            const trend = changeVal > 0 ? 'up' : changeVal < 0 ? 'down' : 'flat';
            const changePercent = (changeVal / stock.last) * 100;

            return (
              <Tr key={stock.code} onClick={() => onStockClick(stock.code)}>
                <Td>
                  <StockNameWrapper>
                    <StarButton
                      isStarred={isStarred(stock.code)}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(stock.code);
                      }}
                    >
                      {isStarred(stock.code) ? '★' : '☆'}
                    </StarButton>
                    <Typography variant="body" level={2} color="foreground.1">
                      {stock.name}
                    </Typography>
                  </StockNameWrapper>
                </Td>
                <Td>
                  <Typography variant="body" level={2} color="foreground.1">
                    {stock.today.toLocaleString()}원
                  </Typography>
                </Td>
                <Td>
                  <Typography
                    variant="body"
                    level={2}
                    color={trend === 'up' ? 'danger.1' : trend === 'down' ? 'info.1' : 'foreground.3'}
                    bold
                  >
                    {trend === 'flat'
                      ? '-'
                      : `${trend === 'up' ? '▲' : '▼'} ${Math.abs(changeVal).toLocaleString()} (${changePercent.toFixed(1)}%)`}
                  </Typography>
                </Td>
                <Td>
                  {stock.toBuy?.map((signal, idx) => (
                    <SignalBadgeWrapper key={idx}>
                      <Typography variant="caption" color="white" as="span">
                        {signal}
                      </Typography>
                    </SignalBadgeWrapper>
                  ))}
                </Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </TableContainer>
  );
};
