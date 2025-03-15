import { css } from "@emotion/react";
import { Skeleton, TextField, Autocomplete } from "@mui/material";
import { StockData } from "@src/store/types";

export default function AutoComplete(props: {
  width: number;
  height: number;
  kospi200: StockData[];
  onSelected: (v: string) => void;
}) {
  return (
    <>
      {props.kospi200.length > 0 ? (
        <div
          css={css`
            width: ${props.width}px;
          `}
        >
          <Autocomplete
            disablePortal
            css={css`
              height: ${props.height}px;
              .MuiOutlinedInput-root {
                height: ${props.height}px;
              }
              .MuiInputBase-root {
                font-size: ${props.height / 3}px;
              }
            `}
            options={props.kospi200.map((stock) => {
              return {
                label:
                  stock.name +
                  (stock.to_buy.includes("rsi") ? " #rsi" : "") +
                  (stock.to_buy.includes("band") ? " #band" : ""),
                id: stock.code,
              };
            })}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="종목"
                css={css`
                  font-size: ${props.height}px;
                  background-color: var(--paper);
                `}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              />
            )}
            onChange={(e, v) => {
              if (v) {
                props.onSelected(v.id);
              }
            }}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "window",
                    },
                  },
                ],
              },
              paper: {
                sx: {
                  boxShadow: "none",
                  border: "none",
                },
              },
            }}
          />
        </div>
      ) : (
        <Skeleton
          variant="rectangular"
          css={css`
            width: ${props.width}px;
            height: ${props.height}px;
          `}
        />
      )}
    </>
  );
}
