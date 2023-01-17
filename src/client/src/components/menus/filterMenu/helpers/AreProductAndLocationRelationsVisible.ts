import { Relation } from "@mimirorg/modelbuilder-types";

/**
 * Helper component to define if the Visual Filter should display options for Product and Location relations.
 * @param isTreeView
 * @param relationConnectors
 * @returns a boolean value.
 */
const AreProductAndLocationRelationsVisible = (isTreeView: boolean, relationConnectors: Relation[]) => {
  if (isTreeView) return !!relationConnectors.length;
  return !!relationConnectors.length;
};

export default AreProductAndLocationRelationsVisible;
