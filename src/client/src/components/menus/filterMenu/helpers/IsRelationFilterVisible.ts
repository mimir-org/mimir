import { Connector } from "../../../../models";

/**
 * Helper component to define if the Visual Filter should display options for relations connectors.
 * @param isTreeView
 * @param isSplitView
 * @param relationConnectors
 * @returns a boolean value.
 */
const IsRelationFilterVisible = (isTreeView: boolean, isSplitView: boolean, relationConnectors: Connector[]) => {
  if (isTreeView) return !!relationConnectors.length;
  if (!isSplitView) return false;
  return !!relationConnectors.length;
};

export default IsRelationFilterVisible;
