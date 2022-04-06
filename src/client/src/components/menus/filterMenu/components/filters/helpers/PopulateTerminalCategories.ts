import { TextResources } from "../../../../../../assets/text/TextResources";
import { Connector } from "../../../../../../models";
import { TerminalCategory } from "../TransportFilter";

/**
 * Function to find all Terminal Categories on Mimir's Transport Edges.
 * @param transportItems
 * @returns a list of the type TerminalCategory, used by Visual Filter.
 */
export const PopulateTerminalCategories = (transportItems: Connector[]) => {
  const categories = [] as TerminalCategory[];

  transportItems?.forEach((item) => {
    const id = item.terminalCategoryId;
    const name = item.terminalCategory?.name;

    if (!categories.some((x) => x.id === id || x.name === name)) {
      const category = { id, name: name ?? TextResources.CATEGORY } as TerminalCategory;
      categories.push(category);
    }
  });

  return categories;
};
