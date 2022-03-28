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
    if (!categories.some((x) => x.id === item.terminalCategoryId || x.name === item.terminalCategory?.name)) {
      const category = {
        id: item.terminalCategoryId,
        name: item.terminalCategory?.name ?? TextResources.FILTER_CATEGORY,
      } as TerminalCategory;
      categories.push(category);
    }
  });

  return categories;
};
