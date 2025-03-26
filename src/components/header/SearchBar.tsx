import { css } from "@emotion/react";
import useDebounce from "@src/hooks/useDebounce";
import { useRecoilState, useRecoilValue } from "recoil";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { filterState, screenSize } from "@src/store/atoms";

export default function SearchBar() {
  const [filter, setFilter] = useRecoilState(filterState);
  const [nowText, setNowText] = useState(filter.searchText);
  const size = useRecoilValue(screenSize);
  const debouncedQuery = useDebounce(nowText, 300);

  useEffect(() => {
    setFilter({
      ...filter,
      searchText: debouncedQuery,
    });
  }, [debouncedQuery]);

  return (
    <div
      css={css`
        position: relative;
        width: ${size.width - 40}px;
        max-width: 500px;
        input {
          width: ${size.width - 100}px;
          max-width: 440px;
          padding: 8px 16px 8px 40px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 20px;
          outline: none;
          transition: border-color 0.2s;
          background-color: var(--paper);

          &:focus {
            border-color: var(--highlight);
          }
        }

        svg {
          color: var(--foreground);
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
        }
      `}
    >
      <input
        type="text"
        value={nowText}
        onChange={(e) => {
          setNowText(e.target.value);
        }}
        placeholder="종목 검색"
      />
      <SearchIcon />
    </div>
  );
}
