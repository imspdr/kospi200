import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@imspdr/ui';
import { TopGainerSection as InternalTopGainerSection } from '@/components/TopGainerSection';

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

const TopGainerSectionExport = () => {
  const handleSelect = (code: string) => {
    window.location.href = `https://imspdr.github.io/kospi200/detail/${code}`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <InternalTopGainerSection onStockSelect={handleSelect} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default TopGainerSectionExport;
