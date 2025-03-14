import { css, keyframes } from "@emotion/react";
import React, { useRef, useState, FC, ReactNode, useEffect } from "react";
import { Dragable } from "@src/store/types";

const vibrate = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(0px, 1px); }
  75% { transform: translate(0px, -1px); }
  100% { transform: translate(0, 0); }
`;

const DragableComponent: FC<
  Dragable & {
    setPos: (v: Dragable) => void;
    children: ReactNode;
  }
> = ({ top, left, width, height, setPos, children }) => {
  const [dragging, setDragging] = useState(false);
  let timeoutId: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      timeoutId = setTimeout(() => {
        setDragging(true);
        draggingJobs(e);
      }, 500);
    }
  };
  const handleMouseUp = () => {
    clearTimeout(timeoutId);
  };

  const draggingJobs = (e: React.MouseEvent) => {
    const offSetX = e.clientX - left;
    const offSetY = e.clientY - top;
    const handleMouseMove = (ev: MouseEvent) => {
      setPos({
        top: ev.clientY - offSetY,
        left: ev.clientX - offSetX,
        width: width,
        height: height,
      });
    };

    const draggingMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", draggingMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", draggingMouseUp);
  };

  const handleMouseOut = () => {
    clearTimeout(timeoutId);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragging) {
      e.stopPropagation();
      e.preventDefault();
      setDragging(false);
    }
  };

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
        onClickCapture={handleClickCapture}
        style={{
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
        }}
        css={css`
          ${dragging &&
          css`
            z-index: 9999;
            animation: ${vibrate} 0.2s infinite;
          `}
        `}
      >
        {children}
      </div>
    </>
  );
};

export default DragableComponent;
