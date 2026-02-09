import styled from '@emotion/styled';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const NewsItem = styled.div`
  padding: 16px 8px;
  border-bottom: 1px solid var(--imspdr-background-3);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background: var(--imspdr-background-2);
    border-radius: 8px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const NewsItemTitle = styled.div`
  margin-bottom: 8px;
  line-height: 1.4;
`;

export const NewsItemDescription = styled.div`
  line-height: 1.5;
`;
