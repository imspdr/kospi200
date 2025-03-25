import { useState, useEffect } from "react";
import { nowData, wholeData } from "@src/store/atoms";
import MobileHome from "@src/layouts/MobileHome";
import DeskHome from "@src/layouts/DeskHome";

export default function MainPage() {
  const [width, setWidth] = useState(window.innerWidth);

  const resize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    resize();
    addEventListener("resize", resize);
    return () => removeEventListener("resize", resize);
  }, []);

  return width < 768 ? <MobileHome /> : <DeskHome />;
}
