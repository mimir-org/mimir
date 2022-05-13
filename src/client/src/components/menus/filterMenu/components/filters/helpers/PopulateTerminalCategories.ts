import { TextResources } from "../../../../../../assets/text/TextResources";
import { Connector } from "../../../../../../models";
import { TerminalCategory } from "../TransportFilter";

/**
 * Function to find all Terminal Categories on Mimir's Transport Edges.
 * @param transportConnectors
 * @returns a list of the type TerminalCategory, used by Visual Filter.
 */
export const PopulateTerminalCategories = (transportConnectors: Connector[]) => {
  const categories = [] as TerminalCategory[];

  transportConnectors?.forEach((conn) => {
    const id = conn.terminalCategoryId;
    const name = conn.terminalCategory?.name;

    if (categories.some((c) => c.id === id || c.name === name)) return;

    const category = { id, name: name ?? TextResources.CATEGORY } as TerminalCategory;
    categories.push(category);
  });

  return categories;
};
