import { AutoComplete, useDeviceType } from '@imspdr/ui';
import { InnerWrapper, SearchWrapper } from './styled';
import { useState } from 'react';

interface SearchComponentProps {
  searchOptions: any[];
  onSearchSelect: (option: any) => void;
}

export const SearchComponent = ({ searchOptions, onSearchSelect }: SearchComponentProps) => {
  const { isPc } = useDeviceType();
  const [resetKey, setResetKey] = useState(0);

  const handleSelect = (option: any) => {
    onSearchSelect(option);
    setResetKey((prev) => prev + 1);
  };

  return (
    <SearchWrapper>
      <InnerWrapper>
        <AutoComplete
          key={resetKey}
          options={searchOptions}
          onSelect={handleSelect}
          placeholder={isPc ? '종목명 검색' : '검색'}
        />
      </InnerWrapper>
    </SearchWrapper>
  );
};
