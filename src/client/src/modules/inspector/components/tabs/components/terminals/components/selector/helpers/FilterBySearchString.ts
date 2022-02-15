import { TerminalCategory } from "../../../../../../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { TerminalLikeItem } from "../../../../../../../types";

export const FilterBySearchString = (
  terminals: TerminalLikeItem[],
  terminalCategories: TerminalCategory[],
  searchString: string
): TerminalLikeItem[] =>
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
