import { css } from "@emotion/react";
import { Skeleton, TextField, Autocomplete } from "@mui/material";
import { StockInfo } from "@src/store/types";
import { cachedStockData, nowData } from "@src/store/atoms";
import { useRecoilState } from "recoil";

export default function AutoComplete(props: {
  width: number;
  height: number;
  kospi200: StockInfo[];
}) {
  const [now, setNow] = useRecoilState(nowData);
  const [cachedData, setCachedData] = useRecoilState(cachedStockData);
  const onSelected = async (v: { label: string; id: string; to_buy: string[] }) => {
    const cached = cachedData.find((item) => item.code === v.id);
    if (cached) {
      setNow(cached);
    } else {
      setNow({
        code: v.id,
        name: v.label,
        to_buy: v.to_buy,
        news: [],
        analysis: [],
      });
      const res = await fetch(`/kospi200/data${v.id}.json`);
      if (!res.ok) {
        return undefined;
      }
      const nowdata = await res.json();
      setCachedData((item) => [...item, nowdata]);
      setNow(nowdata);
    }
  };
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
                to_buy: stock.to_buy,
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
                onSelected(v);
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
