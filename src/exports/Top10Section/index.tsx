import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@imspdr/ui';
import { Top10Section as InternalTop10Section } from '@/pages/ListPage/components/Top10Section';

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

const Top10SectionExport = () => {
  const handleSelect = (code: string) => {
    window.location.href = `https://imspdr.github.io/kospi200/detail/${code}`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <InternalTop10Section onStockSelect={handleSelect} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Top10SectionExport;
