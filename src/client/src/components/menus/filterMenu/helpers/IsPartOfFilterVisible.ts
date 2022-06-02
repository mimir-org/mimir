import { IsProduct } from "../../../../helpers/Aspects";
import { Connector, Node } from "../../../../models";

/**
 * Helper function to define if the Visual Filter should display options for partOf connectors.
 * In BlockView partOf connectors are only visible when handling Product Nodes.
 * @param IsTreeView
 * @param partOfConnectors
 * @param nodes
 * @param secondaryNode
 * @returns a boolean value.
 */
const IsPartOfFilterVisible = (IsTreeView: boolean, partOfConnectors: Connector[], nodes: Node[], secondaryNode: Node) => {
  if (IsTreeView) return !!partOfConnectors.length;

  const selectedBlockNode = nodes.find((n) => n.blockSelected);
  const isSplitView = secondaryNode != null;
  const isProduct = isSplitView ? IsProduct(selectedBlockNode) || IsProduct(secondaryNode) : IsProduct(selectedBlockNode);

  return !!partOfConnectors.length && isProduct;
};

export default IsPartOfFilterVisible;
