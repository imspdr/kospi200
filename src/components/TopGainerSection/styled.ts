import styled from '@emotion/styled';
import { Typography } from '@imspdr/ui';

export const GainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
  background: var(--imspdr-background-1);
  border: 1px solid var(--imspdr-background-3);
  border-radius: 16px;
  padding: 16px;
  gap: 12px;

  @media (max-width: 767px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

export const HeaderArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const RankBadge = styled.div`
  background: var(--imspdr-primary-1);
  padding: 2px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
`;

export const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
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
