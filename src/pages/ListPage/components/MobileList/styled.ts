import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  padding-bottom: 100px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MobileTitleWrapper = styled.div`
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

export const StockNameWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


export const ChangeLabelWrapper = styled.div<{ isRising: boolean }>`
  min-width: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${({ isRising }) => (isRising ? 'var(--imspdr-danger-1)' : 'var(--imspdr-info-1)')};
`;

export const EmptyMessageWrapper = styled.div`
  width: 100%;
  text-align: center;
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
  margin-left: 4px;
`;
