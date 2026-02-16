import styled from '@emotion/styled';

export const GainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  background: var(--imspdr-background-1);
  border: 1px solid var(--imspdr-background-3);
  border-radius: 16px;
  padding: 20px;
  gap: 16px;

  @media (max-width: 767px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

export const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PriceArea = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const ChartWrapper = styled.div`
  height: 180px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: var(--imspdr-background-2);
`;

export const NewsWrapper = styled.div`
  margin-top: 4px;
`;
