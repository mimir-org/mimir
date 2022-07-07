/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connector } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { TerminalCategory } from "../TransportFilter";

/**
 * Function to find all Terminal Categories on Mimir's Transport Edges.
 * @param transportConnectors
 * @returns a list of the type TerminalCategory, used by Visual Filter.
 */
export const PopulateTerminalCategories = (transportConnectors: Connector[]) => {
  const categories = [] as TerminalCategory[];

  // TODO: fix

  transportConnectors?.forEach((conn) => {
    const id = ""; // conn.terminalCategory;
    const name = ""; // conn.terminalCategory;

    if (categories.some((c) => c.id === id || c.name === name)) return;

    const category = { id, name: name ?? TextResources.CATEGORY } as TerminalCategory;
    categories.push(category);
  });

  return categories;
};
