import { useRecoilValue } from "recoil";
import { nowData } from "@src/store/atoms";
import { Typography } from "@mui/material";

export default function Title() {
  const nowState = useRecoilValue(nowData);
  return (
    <Typography variant="h6" fontWeight="bold">
      {"KOSPI200" + (nowState ? ` / ${nowState.name}` : "")}
    </Typography>
  );
}
