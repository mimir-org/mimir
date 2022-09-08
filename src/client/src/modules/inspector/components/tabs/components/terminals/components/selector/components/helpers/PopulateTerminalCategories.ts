import { Terminal } from "@mimirorg/modelbuilder-types";
import { TerminalCategoryObject } from "../../../../../../../../../../models/project";

/**
 * Component to sort terminals into terminalCategories
 * @param terminals
 * @returns a list of the type CategoryObject.
 */
export const PopulateTerminalCategories = (terminals: Terminal[]) => {
  const terminalsSortedByCategory = [{}] as [TerminalCategoryObject];

  // Extract terminalCategories from the terminals list and populate the new list
  terminals?.forEach((t) => {
    if (t.terminalCategory === "" || t.terminalCategory == undefined) return;
    if (terminalsSortedByCategory.some((x) => x.name === t.terminalCategory)) return;

    const category = {
      name: t.terminalCategory,
      terminals: terminals.filter((tf) => tf.terminalCategory === t.terminalCategory),
    } as TerminalCategoryObject;

    terminalsSortedByCategory.push(category);
  });

  return terminalsSortedByCategory;
};
