import styled from '@emotion/styled';

export const PageContainer = styled.div`
  width: 100%;
  padding: 24px 24px 0 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 767px) {
    flex-direction: column;
    padding: 8px;
    gap: 16px;
  }
`;

export const LoadingContainer = styled.div`
  padding: 80px;
  text-align: center;
`;

export const FlexColumn = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    height: auto;
    width: 100%;
  }
`;

export const SectionTitleWrapper = styled.div`
  margin-bottom: 12px;
`;
