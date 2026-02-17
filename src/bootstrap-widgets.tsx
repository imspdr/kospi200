import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@imspdr/ui';
import TopRankingSectionExport from './exports/TopRankingSection';
import MiniStockWidgetExport from './exports/MiniStockWidget';

const queryClient = new QueryClient();

const TestContainer = styled.div`
  padding: 40px;
  background: #f5f5f7;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 40px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const WidgetSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #1d1d1f;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #86868b;
  margin: 0;
`;

const WidgetWrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TestContainer>
          <div>
            <Title>Widget Standalone Test Environment</Title>
            <Subtitle>
              이 페이지는 메인 앱의 Provider 없이 익스포트된 위젯들이 독립적으로 잘 작동하는지 테스트합니다.
            </Subtitle>
          </div>

          <WidgetWrapper>
            <WidgetSection>
              <h2 style={{ fontSize: '14px', color: '#0066cc' }}>TopRankingSection (Combined)</h2>
              <TopRankingSectionExport />
            </WidgetSection>

            <WidgetSection>
              <h2 style={{ fontSize: '14px', color: '#0066cc' }}>MiniStockWidget (New)</h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <MiniStockWidgetExport />
                <div style={{ maxWidth: '200px' }}>
                  <p style={{ fontSize: '12px', color: '#86868b', margin: 0 }}>
                    모바일 환경에서 앱 아이콘처럼 작동하는 소형 위젯입니다.
                    화면의 1/3 너비 이하로 설계되었습니다.
                  </p>
                </div>
              </div>
            </WidgetSection>
          </WidgetWrapper>

          <div style={{ marginTop: 'auto', padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #d2d2d7' }}>
            <p style={{ fontSize: '12px', color: '#86868b', margin: 0 }}>
              ※ 클릭 시 <b>https://imspdr.github.io/kospi200/...</b> 로 이동합니다.
            </p>
          </div>
        </TestContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
