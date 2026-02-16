import styled from '@emotion/styled';

export const ChartContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OverlayControls = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  padding: 0 4px;
`;

export const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ChartWrapper = styled.div`
  flex: 1;
  width: 100%;
  min-height: 0;
`;
