import { Terminal } from "@mimirorg/modelbuilder-types";
import { TerminalCategoryObject } from "../../../../../../../models/project";

export const FilterBySearchString = (
  terminals: Terminal[],
  terminalCategories: TerminalCategoryObject[],
  searchString: string
): Terminal[] =>
  (searchString?.length > 0 &&
    terminals.filter(
      (t) =>
        t?.name.toLowerCase().includes(searchString.toLowerCase()) ||
        (t?.terminalCategory &&
          terminalCategories
            .find((cat) => cat.name === t?.terminalCategory)
            ?.name.toLowerCase()
            .includes(searchString.toLowerCase()))
    )) ||
  terminals;
