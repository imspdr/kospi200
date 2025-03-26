import { useParams } from "react-router-dom";
import { useSelectedStockSetter } from "@src/hooks/useSelectedStockSetter";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { screenSize } from "@src/store/atoms";

export default function DetailPage() {
  const { code } = useParams();
  const setCode = useSelectedStockSetter();
  const size = useRecoilValue(screenSize);

  useEffect(() => {
    if (code) {
      setCode(code);
    }
  }, []);

  return <>{size.width < 768 ? <div></div> : <div></div>}</>;
}
