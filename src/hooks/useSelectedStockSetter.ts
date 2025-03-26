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
    await sleep(1000);
    const res = await fetch(`/kospi200/data${code}.json`);
    if (!res.ok) {
      // todo: error handling
      setData({
        data: undefined,
        loading: false,
      });
    }
    const data = await res.json();
    setData({
      data: data,
      loading: false,
    });
    setCachedData((item) => [...item, data]);
  };

  useEffect(() => {
    if (!!code) {
      const cached = cachedData.find((item) => item.code === code);
      if (cached) {
        setData({
          data: cached,
          loading: false,
        });
      } else {
        setData({
          data: { code: code, name: "", analysis: [], news: [] },
          loading: true,
        });
        fetchNewData(code);
      }
    }
  }, [code, setCode]);

  return setCode;
};
