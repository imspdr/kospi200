import { TopRankingSection as InternalTopRankingSection } from '@/components/TopRankingSection';

const TopRankingSectionExport = () => {
  const handleSelect = (code: string) => {
    window.location.href = `https://imspdr.github.io/kospi200/detail/${code}`;
  };

  return <InternalTopRankingSection isWidget={true} onStockSelect={handleSelect} />;
};

export default TopRankingSectionExport;
