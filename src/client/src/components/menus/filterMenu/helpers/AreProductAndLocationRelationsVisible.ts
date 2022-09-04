import { Relation } from "@mimirorg/modelbuilder-types";

/**
 * Helper component to define if the Visual Filter should display options for Product and Location relations.
 * @param isTreeView
 * @param isSplitView
 * @param relationConnectors
 * @returns a boolean value.
 */
const AreProductAndLocationRelationsVisible = (isTreeView: boolean, isSplitView: boolean, relationConnectors: Relation[]) => {
  if (isTreeView) return !!relationConnectors.length;
  if (!isSplitView) return false;
  return !!relationConnectors.length;
};

export default AreProductAndLocationRelationsVisible;
