import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
`;

export const LeftColumn = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  padding-right: 16px;
  gap: 24px;
  box-sizing: border-box;

  /* Stylish scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--imspdr-background-bg3);
    border-radius: 3px;
  }
`;

export const RightColumn = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;

  /* Remove horizontal padding for news items in mobile if needed, 
     but let's keep it consistent first */
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  flex-shrink: 0;
`;
