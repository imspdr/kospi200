import styled from '@emotion/styled';

export const WidgetContainer = styled.div`
  background: var(--imspdr-background-1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: pointer;
  transition: transform 0.1s ease;
  user-select: none;
  overflow: hidden;
  box-sizing: border-box;
  aspect-ratio: 1;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
  width: 100%;
`;
