import { Typography } from "@mui/material";

export default function Title(props: { title: string }) {
  return (
    <Typography noWrap variant="h6" fontWeight="bold">
      {props.title}
    </Typography>
  );
}
