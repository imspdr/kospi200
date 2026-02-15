import { AutoComplete, useDeviceType } from '@imspdr/ui';

interface SearchComponentProps {
  searchOptions: any[];
  onSearchSelect: (option: any) => void;
}

export const SearchComponent = ({ searchOptions, onSearchSelect }: SearchComponentProps) => {
  const { isPc } = useDeviceType();

  return (
    <div style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%' }}>
        <AutoComplete
          options={searchOptions}
          onSelect={onSearchSelect}
          placeholder={isPc ? '종목명 검색' : '검색'}
        />
      </div>
    </div>
  );
};
