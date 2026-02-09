import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const SectionTitle = styled(Typography)`
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

export const RankNumber = styled.span<{ rank: number }>`
  font-weight: 800;
  font-size: 14px;
  min-width: 20px;
  color: ${({ rank }) => (rank <= 3 ? 'var(--imspdr-primary-1)' : 'var(--imspdr-foreground-3)')};
`;

export const CompactInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;
