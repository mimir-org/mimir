import { Connector } from "../../../../../models";

export const FilterBySearchString = (
  terminals: Connector[],
  searchString: string
) =>
  (searchString &&
    searchString.length > 0 &&
    terminals.filter(
      (x) =>
        x && x.name && x.name.toLowerCase().includes(searchString.toLowerCase())
    )) ||
  terminals;
