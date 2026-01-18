import { useEffect } from 'react';
import { useStockDetail } from './useKospiData';
import { useRecentlyViewed } from './useRecentlyViewed';

export const useStockDetailPage = (code: string | undefined) => {
  const { data: stock, isLoading, isError } = useStockDetail(code || null);
  const { addRecentView } = useRecentlyViewed([]);

  useEffect(() => {
    if (code) {
      addRecentView(code);
    }
  }, [code, addRecentView]);

  let derivedData = null;

  if (stock) {
    const lastAnalysis = stock.analysis[stock.analysis.length - 1];
    const prevAnalysis = stock.analysis[stock.analysis.length - 2];

    const todayPrice = stock.today || lastAnalysis.end;
    const lastPrice = stock.last || prevAnalysis.end;
    const changePercent = ((todayPrice - lastPrice) / lastPrice) * 100;

    derivedData = {
      todayPrice,
      changePercent
    };
  }

  return {
    stock,
    isLoading,
    isError,
    ...derivedData
  };
};
