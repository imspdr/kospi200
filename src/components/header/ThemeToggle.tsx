import { css, keyframes } from "@emotion/react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRecoilState } from "recoil";
import { isDarkTheme } from "@src/store/atoms";

export default function ThemeToggle() {
  const right = 12;
  const top = 12;
  const ICONTOPHIGH = `${top}px`;
  const ICONTOPLOW = `${top + 13}px`;
  const ICONRIGHT = `${right}px`;
  const ICONRIGHTFROM = `${right + 10}px`;
  const ICONRIGHTTO = `${right - 10}px`;
  const [isDark, setTheme] = useRecoilState(isDarkTheme);

  const toggleTheme = () => {
    setTheme((prev) => !prev);
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
    if (isDark) {
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
  };
  const raise = keyframes`
    from {
      opacity: 0;
      top: ${ICONTOPLOW};
      right: ${ICONRIGHTFROM};
      transform: rotate(-45deg);
    }
    to {
      opacity: 1;
      top: ${ICONTOPHIGH};
      right: ${ICONRIGHT};
    }`;
  const down = keyframes`
    from {
      opacity: 1;
      top: ${ICONTOPHIGH};
      right: ${ICONRIGHT};
    }
    to {
      opacity: 0;
      top: ${ICONTOPLOW};
      right: ${ICONRIGHTTO};
      transform: rotate(45deg);
    }`;

  return (
    <div
      onClick={toggleTheme}
      css={css`
        position: relative;
        height: 48px;
        width: 48px;
        z-index: 10;
      `}
    >
      <DarkModeIcon
        css={css`
          position: absolute;
          opacity: ${isDark ? 1 : 0};
          top: ${isDark ? ICONTOPHIGH : ICONTOPLOW};
          right: ${isDark ? ICONRIGHT : ICONRIGHTTO};
          animation: ${isDark ? raise : down} 1s;
        `}
      />
      <WbSunnyIcon
        css={css`
          position: absolute;
          opacity: ${isDark ? 0 : 1};
          top: ${isDark ? ICONTOPLOW : ICONTOPHIGH};
          right: ${isDark ? ICONRIGHTTO : ICONRIGHT};
          animation: ${isDark ? down : raise} 1s;
        `}
      />
    </div>
  );
}
