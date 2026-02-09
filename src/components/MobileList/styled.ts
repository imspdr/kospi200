import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MobileTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 700;
  padding: 0 4px;
`;

export const ListWrapper = styled.div`
  background: var(--imspdr-background-1);
  border: 1px solid var(--imspdr-background-3);
  border-radius: 12px;
  overflow: hidden;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--imspdr-background-3);
  gap: 12px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background: var(--imspdr-background-2);
  }
`;

export const Rank = styled.span<{ isTop?: boolean }>`
  font-weight: 800;
  font-size: 14px;
  min-width: 20px;
  color: ${({ isTop }) => (isTop ? 'var(--imspdr-primary-1)' : 'var(--imspdr-foreground-3)')};
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const StockName = styled(Typography)`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SignalBadge = styled.span`
  background: var(--imspdr-primary-1);
  color: white;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 700;
  margin-left: 4px;
`;
