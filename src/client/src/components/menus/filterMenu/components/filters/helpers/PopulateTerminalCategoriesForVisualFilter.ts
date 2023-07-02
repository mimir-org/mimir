import { ConnectorTerminal } from "lib";
import { TerminalCategoryObject } from "../../../../../../models/project";

/**
 * Function to find all Terminal Categories on Mimir's Transport Edges.
 * @param transportTerminals
 * @returns a list of the type TerminalCategory, used by Visual Filter.
 */
export const PopulateTerminalCategoriesForVisualFilter = (transportTerminals: ConnectorTerminal[]) => {
  const categories = [] as TerminalCategoryObject[];

  transportTerminals?.forEach((t) => {
    const name = t.terminalParentType;

    if (categories.some((c) => c.name === name)) return;

    const category = {
      name: t.terminalParentType,
      terminals: transportTerminals.filter((tf) => tf.terminalParentType === t.terminalParentType),
    } as TerminalCategoryObject;

    categories.push(category);
  });

  return categories;
};
