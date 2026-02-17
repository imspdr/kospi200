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

  box-sizing: border-box;
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
  gap: 8px;
  padding: 8px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 400px;
  flex-shrink: 0;
`;

export const MobileChartWrapper = styled.div`
  width: 100%;
  height: 520px;
  flex-shrink: 0;
`;

export const MessageWrapper = styled.div`
  padding: 24px;
`;
