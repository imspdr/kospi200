import styled from '@emotion/styled';

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--imspdr-background-3);

  @media (max-width: 767px) {
    gap: 6px;
    padding-bottom: 8px;
  }
`;

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PriceSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

