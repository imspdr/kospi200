import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SectionTitleWrapper = styled.div`
  margin-bottom: 12px;
`;

export const LoadingContainer = styled.div`
  padding: 80px;
  text-align: center;
`;

export const StockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 8px;
  gap: 16px;
  overflow-y: auto;
  flex: 1;

  @media (max-width: 767px) {
    overflow-y: visible;
    padding: 0;
  }
`;
