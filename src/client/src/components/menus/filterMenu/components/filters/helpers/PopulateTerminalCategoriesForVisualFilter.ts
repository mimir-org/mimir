import { Terminal } from "@mimirorg/modelbuilder-types";
import { TerminalCategoryObject } from "../../../../../../models/project";

/**
 * Function to find all Terminal Categories on Mimir's Transport Edges.
 * @param transportTerminals
 * @returns a list of the type TerminalCategory, used by Visual Filter.
 */
export const PopulateTerminalCategoriesForVisualFilter = (transportTerminals: Terminal[]) => {
  const categories = [] as TerminalCategoryObject[];

  transportTerminals?.forEach((t) => {
    const name = t.terminalParentTypeName;

    if (categories.some((c) => c.name === name)) return;

    const category = {
      name: t.terminalParentTypeName,
      terminals: transportTerminals.filter((tf) => tf.terminalParentTypeName === t.terminalParentTypeName),
    } as TerminalCategoryObject;

    categories.push(category);
  });

  return categories;
};
