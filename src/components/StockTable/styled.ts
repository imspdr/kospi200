import styled from '@emotion/styled';

export const TableContainer = styled.div<{ maxHeight?: string }>`
  width: 100%;
  overflow-x: auto;
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}; overflow-y: auto;`}
  border: 1px solid var(--imspdr-background-bg3);
  border-radius: 8px;
  background: var(--imspdr-background-bg1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: var(--imspdr-foreground-fg2);
  background: var(--imspdr-background-bg2);
  border-bottom: 2px solid var(--imspdr-background-bg3);
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: var(--imspdr-foreground-fg1);
  border-bottom: 1px solid var(--imspdr-background-bg3);
`;

export const Tr = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--imspdr-background-bg2);
  }

  &:last-child td {
    border-bottom: none;
  }
`;

export const StarButton = styled.button<{ isStarred: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: ${({ isStarred }) => (isStarred ? '#FFD700' : 'var(--imspdr-foreground-fg3)')};
  padding: 0;
  margin-right: 8px;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Change = styled.span<{ trend: 'up' | 'down' | 'flat' }>`
  color: ${({ trend }) => (trend === 'up' ? '#e23d29' : trend === 'down' ? '#1e75d0' : '#999999')};
  font-weight: 600;
`;

export const SignalBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  margin: 2px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  background: var(--imspdr-primary-main);
  color: white;
`;

export const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: var(--imspdr-foreground-fg3);
  font-size: 14px;
`;

export const StockNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
