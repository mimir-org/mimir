import { TerminalCategory } from "../../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { Connector } from "../../../../../models";

export const FilterBySearchString = (
  terminals: Connector[],
  terminalCategories: TerminalCategory[],
  searchString: string
) =>
  (searchString &&
    searchString.length > 0 &&
    terminals.filter(
      (x) =>
        x &&
        ((x.name && x.name.toLowerCase().includes(searchString.toLowerCase())) ||
          (x.terminalCategoryId &&
            terminalCategories
              .find((cat) => cat.id === x.terminalCategoryId)
              ?.name.toLowerCase()
              .includes(searchString.toLowerCase())))
    )) ||
  terminals;
