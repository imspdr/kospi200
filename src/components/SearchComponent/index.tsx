import { AutoComplete, useDeviceType } from '@imspdr/ui';
import { InnerWrapper, SearchWrapper } from './styled';

interface SearchComponentProps {
  searchOptions: any[];
  onSearchSelect: (option: any) => void;
}

export const SearchComponent = ({ searchOptions, onSearchSelect }: SearchComponentProps) => {
  const { isPc } = useDeviceType();

  return (
    <SearchWrapper>
      <InnerWrapper>
        <AutoComplete
          options={searchOptions}
          onSelect={onSearchSelect}
          placeholder={isPc ? '종목명 검색' : '검색'}
        />
      </InnerWrapper>
    </SearchWrapper>
  );
};
