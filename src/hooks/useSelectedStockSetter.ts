import { useState, useEffect } from "react";
import { selectedStockData } from "@src/store/atoms";
import { cachedStockDatas } from "@src/store/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sleep } from "@src/util";

export const useSelectedStockSetter = () => {
  const [code, setCode] = useState<string>("");
  const setData = useSetRecoilState(selectedStockData);
  const [cachedData, setCachedData] = useRecoilState(cachedStockDatas);

  const fetchNewData = async (code: string) => {
    const res = await fetch(`/kospi200/data${code}.json`);
    if (!res.ok) {
      // todo: error handling
      setData(undefined);
    }
    const data = await res.json();
    setData(data);
    setCachedData((item) => [...item, data]);
  };

  useEffect(() => {
    if (!!code) {
      const cached = cachedData.find((item) => item.code === code);
      if (cached) {
        setData(cached);
      } else {
        fetchNewData(code);
      }
    } else {
      setData(undefined);
    }
  }, [code, setCode]);

  return setCode;
};
