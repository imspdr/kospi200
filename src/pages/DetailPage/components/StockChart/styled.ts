import styled from '@emotion/styled';

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const OverlayControls = styled.div`
  position: absolute;
  top: 0px;
  left: 5%;
  z-index: 10;
  display: flex;
  gap: 8px;
  pointer-events: auto;
`;

export const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ChartWrapper = styled.div`
  height: 100%;
  width: 100%;
`;
