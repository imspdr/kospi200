import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const CompactStockList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: 8px;
  background: transparent;
  padding: 0;
`;

export const CompactStockItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  gap: 12px;

  &:hover {
    background: var(--imspdr-background-2);
  }
`;

export const RankNumberWrapper = styled.div`
  min-width: 20px;
`;

export const CompactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const ValueSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ChangeLabelWrapper = styled.div<{ isRising: boolean }>`
  min-width: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${({ isRising }) => (isRising ? 'var(--imspdr-danger-1)' : 'var(--imspdr-info-1)')};
`;
