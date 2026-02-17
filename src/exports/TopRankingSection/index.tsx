import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@imspdr/ui';
import { TopRankingSection as InternalTopRankingSection } from '@/components/TopRankingSection';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const TopRankingSectionExport = () => {
  const handleSelect = (code: string) => {
    window.location.href = `https://imspdr.github.io/kospi200/detail/${code}`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <InternalTopRankingSection onStockSelect={handleSelect} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default TopRankingSectionExport;
