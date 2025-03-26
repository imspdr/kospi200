import { selector } from "recoil";
import { stockInfos, filterState } from "./atoms";
import { Tags } from "./types";

export const filteredStockInfos = selector({
  key: "filteredAndSortedTodoList",
  get: ({ get }) => {
    const stocks = get(stockInfos);
    const filter = get(filterState);
    const checkTag = (tags: Tags[]) => {
      let ret = true;
      if (filter.tags.length > 0) {
        for (let i = 0; i < filter.tags.length; i++) {
          if (!tags.includes(filter.tags[i]!)) {
            ret = false;
            break;
          }
        }
      }
      return ret;
    };

    const filteredList = stocks.filter((stock) => {
      const searchOption = stock.name.includes(filter.searchText);
      const tagOption = checkTag(stock.to_buy);
      return searchOption && tagOption;
    });

    return filteredList;
  },
});
