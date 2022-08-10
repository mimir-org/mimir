import { Terminal } from "@mimirorg/modelbuilder-types";
import { TerminalCategory } from "../TransportFilter";

/**
 * Function to find all Terminal Categories on Mimir's Transport Edges.
 * @param transportTerminals
 * @returns a list of the type TerminalCategory, used by Visual Filter.
 */
export const PopulateTerminalCategories = (transportTerminals: Terminal[]) => {
  const categories = [] as TerminalCategory[];

  transportTerminals?.forEach((t) => {
    const id = t.terminalTypeId;
    const name = t.terminalCategory;

    if (categories.some((c) => c.id === id || c.name === name)) return;

    categories.push({ id, name });
  });

  return categories;
};
