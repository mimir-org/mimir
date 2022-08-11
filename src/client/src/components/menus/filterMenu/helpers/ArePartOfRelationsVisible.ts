import { IsProduct } from "../../../../helpers/Aspects";
import { Node, Relation } from "@mimirorg/modelbuilder-types";

/**
 * Helper function to define if the Visual Filter should display options for partOf relations.
 * In BlockView partOf relations are only visible when handling Product Nodes.
 * @param IsTreeView
 * @param partOfRelations
 * @param nodes
 * @param secondaryNode
 * @returns a boolean value.
 */
const ArePartOfRelationsVisible = (IsTreeView: boolean, partOfRelations: Relation[], nodes: Node[], secondaryNode: Node) => {
  if (IsTreeView) return !!partOfRelations.length;

  const selectedBlockNode = nodes.find((n) => n.blockSelected);
  const isSplitView = secondaryNode != null;
  const isProduct = isSplitView ? IsProduct(selectedBlockNode) || IsProduct(secondaryNode) : IsProduct(selectedBlockNode);

  return !!partOfRelations.length && isProduct;
};

export default ArePartOfRelationsVisible;
