import styled from '@emotion/styled';
import { Typography } from '@imspdr/ui';

export const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  background: var(--imspdr-background-1);
  border: 1px solid var(--imspdr-background-3);
  border-radius: 16px;
  overflow-y: auto;
  overflow-x: hidden;
  position: sticky;
  top: 0;
  flex-shrink: 0;
  max-height: calc(100vh - 104px); /* 100vh minus header 60 px - PageContainer padding (24px * 2) */
`;

export const WidgetTitle = styled.div`
  padding: 0 16px 12px 16px;
  text-align: right;
`;

export const Top1Wrapper = styled.div`
  & > div {
    border: none;
    width: 100%;
    max-width: none;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const TopListWrapper = styled.div`
  padding: 0 8px 16px 8px; /* Side padding adjusted to account for item padding */
  
  & > div {
    border: none;
    width: 100%;
    max-width: none;
    padding: 0;
    background: transparent;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--imspdr-background-3);
  margin: 0 16px 8px 16px;
  opacity: 0.6;
`;
