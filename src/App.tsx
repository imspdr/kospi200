import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { nowData } from "./store/atoms";
import { Typography } from "@mui/material";
import { css } from "@emotion/react";
import { unselectable } from "@src/util";
import ThemeToggle from "@src/components/ThemeToggle";
import MainPage from "./pages/MainPage";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const nowSelected = useRecoilValue(nowData);

  const toggleTheme = () => {
    const styles = getComputedStyle(document.body);

    //light
    const black = styles.getPropertyValue("--black");
    const white = styles.getPropertyValue("--white");
    const light = styles.getPropertyValue("--light");
    const mint = styles.getPropertyValue("--mint");
    const pink = styles.getPropertyValue("--pink");
    const red = styles.getPropertyValue("--red");
    const blue = styles.getPropertyValue("--blue");
    const gray = styles.getPropertyValue("--gray");
    const grid = styles.getPropertyValue("--grid");
    const scrollColorBlack = styles.getPropertyValue("--scroll-color-black");

    //dark
    const darkBlack = styles.getPropertyValue("--dark-black");
    const darkWhite = styles.getPropertyValue("--dark-white");
    const darkMint = styles.getPropertyValue("--dark-mint");
    const darkPink = styles.getPropertyValue("--dark-pink");
    const darkBlue = styles.getPropertyValue("--dark-blue");
    const darkRed = styles.getPropertyValue("--dark-red");
    const darkGray = styles.getPropertyValue("--dark-gray");
    const darkGrid = styles.getPropertyValue("--dark-grid");
    const scrollColorWhite = styles.getPropertyValue("--scroll-color-white");

    const docEl = document.documentElement;
    if (darkMode) {
      docEl.style.setProperty("--background", light);
      docEl.style.setProperty("--foreground", black);
      docEl.style.setProperty("--scroll-color", scrollColorBlack);
      docEl.style.setProperty("--highlight", mint);
      docEl.style.setProperty("--paper", white);
      docEl.style.setProperty("--warning", pink);
      docEl.style.setProperty("--chart-red", red);
      docEl.style.setProperty("--chart-blue", blue);
      docEl.style.setProperty("--chart-gray", gray);
      docEl.style.setProperty("--chart-grid", grid);
    } else {
      docEl.style.setProperty("--background", darkBlack);
      docEl.style.setProperty("--foreground", darkWhite);
      docEl.style.setProperty("--scroll-color", scrollColorWhite);
      docEl.style.setProperty("--highlight", darkMint);
      docEl.style.setProperty("--paper", black);
      docEl.style.setProperty("--warning", darkPink);
      docEl.style.setProperty("--chart-red", darkRed);
      docEl.style.setProperty("--chart-blue", darkBlue);
      docEl.style.setProperty("--chart-gray", darkGray);
      docEl.style.setProperty("--chart-grid", darkGrid);
    }
    setDarkMode((v) => !v);
  };
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height: 48px;
            width: calc(100% - 20px);
            padding: 0px 10px;
            background-color: var(--paper);
            ${unselectable}
          `}
        >
          <Typography>{"KOSPI200" + (nowSelected ? ` / ${nowSelected.name}` : "")}</Typography>
          <ThemeToggle onClick={toggleTheme} isDark={darkMode} />
        </div>
        <div
          css={css`
            position: absolute;
            top: 51px;
            width: 100%;
            height: calc(100% - 51px);
            ${unselectable}
          `}
        >
          <MainPage />
        </div>
      </>
    </ThemeProvider>
  );
}
