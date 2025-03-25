import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import MobileDetail from "@src/layouts/MobileDetail";
import DeskDetail from "@src/layouts/DeskDetail";

export default function DetailPage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    resize();
    addEventListener("resize", resize);
    return () => removeEventListener("resize", resize);
  }, []);

  return width < 768 ? <MobileDetail /> : <DeskDetail />;
}
