import { FC } from 'react';

import {
  Change,
  EmptyState,
  SignalBadge,
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
        <EmptyState>{emptyMessage}</EmptyState>
      </TableContainer>
    );
  }

  return (
    <TableContainer maxHeight={maxHeight}>
      <Table>
        <thead>
          <tr>
            <Th>종목</Th>
            <Th>현재가</Th>
            <Th>대비</Th>
            <Th>신호</Th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            const change = stock.today - stock.last;
            const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
            const changePercent = (change / stock.last) * 100;

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
                    {stock.name}
                  </StockNameWrapper>
                </Td>
                <Td>{stock.today.toLocaleString()}원</Td>
                <Td>
                  <Change trend={trend}>
                    {trend === 'flat'
                      ? '-'
                      : `${trend === 'up' ? '▲' : '▼'} ${Math.abs(change).toLocaleString()} (${changePercent.toFixed(1)}%)`}
                  </Change>
                </Td>
                <Td>
                  {stock.toBuy?.map((signal, idx) => (
                    <SignalBadge key={idx}>{signal}</SignalBadge>
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
