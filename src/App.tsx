import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkTheme } from "./store/atoms";
import { css } from "@emotion/react";
import { unselectable } from "@src/util";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";

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
          <Route path="/detail" element={<DetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}
