import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes, Navigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkTheme, screenSize, stockInfos } from "./store/atoms";
import { css } from "@emotion/react";
import { unselectable } from "@src/util";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import { useEffect } from "react";
import { StockInfo } from "./store/types";

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
  const isDark = useRecoilValue(isDarkTheme);
  const setSize = useSetRecoilState(screenSize);
  const setStockInfos = useSetRecoilState(stockInfos);

  const resize = () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const fetchStockInfos = async () => {
    const res = await fetch("/kospi200/codes.json");
    if (!res.ok) {
      setStockInfos([]);
    }
    const jsonData: StockInfo[] = await res.json();
    setStockInfos(jsonData);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    fetchStockInfos();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <div
        css={css`
          ${unselectable}
          width: 100%;
          height: 100%;
        `}
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:code" element={<DetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
