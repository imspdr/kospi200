import { Typography } from '@imspdr/ui';
import styled from '@emotion/styled';

export const SectionTitle = styled(Typography)`
  margin-bottom: 12px;
`;

export const LoadingContainer = styled.div`
  padding: 80px;
  text-align: center;
`;

export const StockGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 8px;
  gap: 16px;
  overflow-y: auto;
  flex: 1;

  & > * {
    flex: 1 1 300px;
  }

  @media (max-width: 767px) {
    overflow-y: visible;
    padding: 0;
  }
`;
