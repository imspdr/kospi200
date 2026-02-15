import { useState, FC, useEffect } from 'react';
import styled from '@emotion/styled';
import { SIDEBAR_WIDTH, TAB_BAR_WIDTH } from './constants/layout';

import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Layout, ModalProvider, ThemeProvider, ToastProvider } from '@imspdr/ui';
import { useDeviceType } from '@imspdr/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SearchComponent } from './components/SearchComponent';
import Sidebar from './components/Sidebar';
import { useDisplayStocks } from './hooks/useDisplayStocks';
import { useStocks } from './hooks/useKospiData';
import { DetailPage } from './pages/DetailPage';
import ListPage from './pages/ListPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/kospi200' : '/';

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastProvider>
          <ModalProvider>
            <BrowserRouter basename={basename}>
              <AppLayout />
            </BrowserRouter>
          </ModalProvider>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AppLayout: FC = () => {
  const navigate = useNavigate();
  const { isPc } = useDeviceType();
  const { data: stocks } = useStocks();
  const [isFolded, setIsFolded] = useState(!isPc);
  const { searchOptions } = useDisplayStocks(stocks ?? []);

  // Update isFolded when device type changes
  useEffect(() => {
    setIsFolded(!isPc);
  }, [isPc]);

  const handleStockClick = (code: string) => {
    navigate(`/detail/${code}`);
  };

  return (
    <Layout
      title="KOSPI200"
      onHomeClick={() => navigate('/list')}
      middleContent={
        <SearchComponent
          searchOptions={searchOptions}
          onSearchSelect={(opt) => handleStockClick(opt.value)}
        />
      }
    >
      <ContentWrapper isFolded={isFolded}>
        <Routes>
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:code" element={<DetailPage />} />
          <Route path="/" element={<Navigate to="/list" replace />} />
        </Routes>
      </ContentWrapper>
      <Sidebar isFolded={isFolded} onToggleFold={() => setIsFolded(!isFolded)} />
    </Layout>
  );
};

const ContentWrapper = styled.div<{ isFolded: boolean }>`
  height: 100%;
  margin-right: ${({ isFolded }) =>
    isFolded ? `${TAB_BAR_WIDTH}px` : `${SIDEBAR_WIDTH}px`};
  transition: margin-right 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1080px) {
    margin-right: ${TAB_BAR_WIDTH}px;
  }

  @media (max-width: 767px) {
    margin-right: 0px;
  }
`;

export default App;
