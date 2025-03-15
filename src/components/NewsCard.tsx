import { css } from "@emotion/react";
import { Typography } from "@mui/material";
import { useState } from "react";

const NewsCardContainer = (width: number, height: number, padding: number, hover: boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${width - padding * 2}px;
  padding: ${padding + (hover ? -1 : 0)}px;
  background-color: var(--paper);
  overflow: hidden;
  ${hover && "border: 1px solid;"}
`;

export default function NewsCard(props: {
  title: string;
  link: string;
  width: number;
  height: number;
}) {
  const [hover, setHover] = useState(false);
  const { title, link, width, height } = props;
  const titleFontSize = Math.max(width / 30, 12);
  const PADDING = 10;
  return (
    <div
      key={`${title}`}
      css={NewsCardContainer(width, height, PADDING, hover)}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      onClick={() => {
        window.open(link, "_blank", "noopener,noreferrer");
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ fontSize: titleFontSize }}>
        {title}
      </Typography>
    </div>
  );
}
