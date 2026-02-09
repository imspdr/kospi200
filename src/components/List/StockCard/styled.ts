import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const CardContainer = styled.div`
  background: var(--imspdr-background-1);
  border: 1px solid var(--imspdr-background-3);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  min-width: 210px;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px var(--imspdr-shadow);
    border-color: var(--imspdr-primary-1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background: var(--imspdr-primary-1);
    transition: height 0.3s ease;
  }

  &:hover::before {
    height: 100%;
  }
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

export const RankBadge = styled.div<{ rank: number }>`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 22px;
  height: 22px;
  background: ${({ rank }) =>
    rank <= 3 ? 'var(--imspdr-primary-2)' : 'var(--imspdr-background-2)'};
  color: ${({ rank }) => (rank <= 3 ? 'white' : 'var(--imspdr-foreground-2)')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  z-index: 2;
`;

export const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;


export const ChangeLabelWrapper = styled.div<{ isRising: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SignalTagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  flex-shrink: 0;
  padding-top: 4px;
`;

export const SignalTagWrapper = styled.div`
  padding: 4px 8px;
  background: var(--imspdr-primary-1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 11px;
  }
`;
