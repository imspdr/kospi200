import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const CardContainer = styled.div<{ isFolded?: boolean }>`
  background: var(--imspdr-background-2);
  border: 1px solid var(--imspdr-background-3);
  border-radius: 8px;
  padding: ${({ isFolded }) => (isFolded ? '8px' : '10px 12px')};
  cursor: pointer;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  align-items: ${({ isFolded }) => (isFolded ? 'center' : 'stretch')};

  @media (hover: hover) {
    &:hover {
      border-color: var(--imspdr-primary-1);
      background: var(--imspdr-background-1);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px var(--imspdr-shadow);
    }
  }
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const NameSection = styled.div`
  display: flex;
  flex-direction:row;
  align-items: center;
  gap: 6px;
  overflow: hidden;
`;

export const StarButton = styled.button<{ isStarred: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isStarred }) => (isStarred ? 'var(--imspdr-primary-1)' : 'var(--imspdr-foreground-3)')};
  font-size: 18px;
`;

export const StockNameWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  flex: 1;
  min-width: 0;
`;

export const SignalTag = styled.div`
  background: var(--imspdr-primary-1);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 10px;
  }
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`;


export const ChangeWrapper = styled.div<{ trend: 'up' | 'down' | 'flat' }>`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FoldedIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SignalDot = styled.div`
  width: 6px;
  height: 6px;
  background: var(--imspdr-primary-1);
  border-radius: 50%;
  position: absolute;
  top: 4px;
  right: 4px;
`;
