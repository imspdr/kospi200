import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100%); opacity: 0; }
`;

export const TickerContainer = styled.div`
  height: 32px;
  overflow: hidden;
  background-color: var(--imspdr-background-2);
  border-radius: 4px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const TickerItem = styled.div<{ status: 'current' | 'previous' | 'hidden' }>`
  position: absolute;
  left: 12px;
  right: 12px;
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  opacity: ${({ status }) => (status === 'hidden' ? 0 : 1)};
  visibility: ${({ status }) => (status === 'hidden' ? 'hidden' : 'visible')};
  
  animation: ${({ status }) =>
    status === 'current'
      ? css`${slideUp} 0.5s ease-in-out forwards`
      : status === 'previous'
        ? css`${slideOut} 0.5s ease-in-out forwards`
        : 'none'};

  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  &:hover {
    text-decoration: underline;
  }
`;
