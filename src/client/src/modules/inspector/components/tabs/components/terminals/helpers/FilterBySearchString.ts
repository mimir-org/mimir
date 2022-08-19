import { Terminal } from "@mimirorg/modelbuilder-types";
import { CategoryObject } from "../components/selector/components/TerminalsList";

export const FilterBySearchString = (
  terminals: Terminal[],
  terminalCategories: CategoryObject[],
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
