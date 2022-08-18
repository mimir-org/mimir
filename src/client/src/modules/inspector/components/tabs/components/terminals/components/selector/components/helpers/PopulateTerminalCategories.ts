import { Terminal } from "@mimirorg/modelbuilder-types";
import { CategoryObject } from "../TerminalsList";

/**
 * Component to sort terminals into terminalCategories
 * @param terminals
 * @returns a list of the type CategoryObject.
 */
export const PopulateTerminalCategories = (terminals: Terminal[]) => {
  const terminalsSortedByCategory = [{}] as [CategoryObject];

  // Extract terminalCategories from the terminals list and populate the new list
  terminals.forEach((t) => {
    if (t.terminalCategory === "") return;
    if (terminalsSortedByCategory.some((x) => x.name === t.terminalCategory)) return;

    const category = {
      name: t.terminalCategory,
      terminals: terminals.filter((tf) => tf.terminalCategory === t.terminalCategory),
    } as CategoryObject;

    terminalsSortedByCategory.push(category);
  });

  return terminalsSortedByCategory;
};
