// import { TerminalCategory } from "../../../../../../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { TerminalLikeItem } from "../../../../../../../types";

export const FilterBySearchString = (
  terminals: TerminalLikeItem[],
  terminalCategories: any[],
  searchString: string
): TerminalLikeItem[] =>
  (searchString?.length > 0 &&
    terminals.filter(
      (x) => x && x.name && x.name.toLowerCase().includes(searchString.toLowerCase()) //||
      // (x.terminalCategory &&
      //   terminalCategories
      //     .find((cat) => cat.id === x.terminalCategory)
      //     ?.name.toLowerCase()
      //     .includes(searchString.toLowerCase())))
    )) ||
  terminals;

// TODO: fix
