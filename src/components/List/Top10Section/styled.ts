import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const SectionTitleWrapper = styled.div`
  margin-bottom: 12px;
`;

export const CompactStockList = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  gap: 8px;
  background: var(--imspdr-background-1);
  border: 1px solid var(--imspdr-background-3);
  border-radius: 16px;
  padding: 12px;

  @media (max-width: 767px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

export const CompactStockItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
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
