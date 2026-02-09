import styled from '@emotion/styled';

export const TableContainer = styled.div<{ maxHeight?: string }>`
  width: 100%;
  overflow-x: auto;
  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight}; overflow-y: auto;`}
  border: 1px solid var(--imspdr-background-3);
  border-radius: 8px;
  background: var(--imspdr-background-1);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  background: var(--imspdr-background-2);
  border-bottom: 2px solid var(--imspdr-background-3);
  position: sticky;
  top: 0;
  z-index: 1;

  & > span {
  }
`;

export const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid var(--imspdr-background-3);
`;

export const Tr = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--imspdr-background-2);
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
  color: ${({ isStarred }) => (isStarred ? 'var(--imspdr-warning-1)' : 'var(--imspdr-foreground-3)')};
  padding: 0;
  margin-right: 8px;

  &:hover {
    transform: scale(1.1);
  }
`;


export const SignalBadgeWrapper = styled.div`
  display: inline-block;
  padding: 2px 8px;
  margin: 2px;
  border-radius: 4px;
  background: var(--imspdr-primary-1);
  color: white;

  & > span {
    font-size: 11px;
  }
`;

export const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
`;

export const StockNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
