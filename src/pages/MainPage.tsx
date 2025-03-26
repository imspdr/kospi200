import CardLayout from "@src/components/body/CardLayout";
import RowLayout from "@src/components/body/RowLayout";
import MainHeader from "@src/components/header/MainHeader";
import SearchBar from "@src/components/header/SearchBar";
import { Divider } from "@mui/material";
import { css } from "@emotion/react";
import { useRecoilValue } from "recoil";
import { filterState, screenSize } from "@src/store/atoms";

export default function MainPage() {
  const size = useRecoilValue(screenSize);
  const filter = useRecoilValue(filterState);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100vh;
      `}
    >
      <MainHeader />
      {filter.open && (
        <>
          <div
            css={css`
              background-color: var(--paper);
              width: 100%;
              padding: 10px 0px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
            `}
          >
            <SearchBar />
            {/* <TagSelector /> */}
          </div>

          <Divider
            css={css`
              width: 100%;
            `}
          />
        </>
      )}
      <div
        css={css`
          flex: 1;
          overflow: auto;
        `}
      >
        {size.width < 768 ? <RowLayout /> : <CardLayout />}
      </div>
    </div>
  );
}
