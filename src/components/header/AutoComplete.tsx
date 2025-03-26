import { css } from "@emotion/react";
import { Skeleton, TextField, Autocomplete, Typography, Chip } from "@mui/material";
import { StockInfo } from "@src/store/types";
import { useSelectedStockSetter } from "@src/hooks/useSelectedStockSetter";

export default function AutoComplete(props: {
  width: number;
  height: number;
  kospi200: StockInfo[];
}) {
  const setCode = useSelectedStockSetter();
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
                label: stock.name,
                id: stock.code,
                ...stock,
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
            renderOption={(props, option) => (
              <li
                {...props}
                css={css`
                  display: flex;
                  flex-direction: row;
                  gap: 10px;

                  white-space: nowrap;
                  overflow: hidden;
                  textp-overflow: ellipsis;
                `}
              >
                <Typography>{option.label.replace("amp;", "")}</Typography>
                <Typography
                  css={css`
                    color: ${option.today > option.last
                      ? "var(--chart-red)"
                      : option.today === option.last
                      ? "var(--chart-gray)"
                      : "var(--chart-blue)"};
                  `}
                >
                  {`${option.today} (${option.today > option.last ? "+" : ""}${
                    option.today - option.last ? option.today - option.last : "-"
                  })`}
                </Typography>
                {option.to_buy.map((v) => (
                  <Chip
                    label={v}
                    css={css`
                      background-color: ${v === "rsi" ? "var(--highlight)" : "var(--warning)"};
                    `}
                  />
                ))}
              </li>
            )}
            onChange={(e, v) => {
              if (v) {
                setCode(v.id);
              }
              if (e) {
                (e.target as HTMLInputElement).blur();
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
