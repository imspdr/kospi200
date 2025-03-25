import { css } from "@emotion/react";
import Title from "./Title";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        width: calc(100% - 20px);
        align-items: center;
        justify-content: space-between;
        max-width: 1000px;
        padding: 0px 10px;
      `}
    >
      <Title />
      <ThemeToggle />
    </div>
  );
}
