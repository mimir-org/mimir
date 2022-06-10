import { Dispatch } from "redux";
import { CreateRequiredOffPageNode } from "./CreateRequiredOffPageNode";
import { IsOffPage } from "../../../../../../helpers/Aspects";
import { BlockNodeSize } from "../../../../../../models/project";
import { IsInputTerminal, IsInputVisible } from "../../../../helpers/Connectors";
import { Node, Edge, Connector } from "@mimirorg/modelbuilder-types";

/**
 * Component to check if any terminals have a required OffPageNode flag. If so, an OffPageNode is created.
 * OffPageNodes are not stored in our model/database, therefore this check is crucial to draw the needed OffPageNodes in Mimir.
 * This component is called from the BlockNode component.
 * @param node
 * @param edges
 * @param size
 * @param dispatch
 */
export const HandleRequiredOffPageNode = (node: Node, edges: Edge[], size: BlockNodeSize, dispatch: Dispatch) => {
  if (!edges.length || !node) return;

  node.connectors.forEach((conn) => {
    if (!conn.isRequired || HasRequiredOffPageNode(edges, conn)) return;

    const isRequired = true;
    const position = { x: size.width, y: node.positionBlockY };
    CreateRequiredOffPageNode(node, conn, position, isRequired, dispatch);
  });
};

/**
 * Function to check if connector already has a required OffPageNode.
 * @param edges
 * @param connector
 * @returns a boolean value.
 */
function HasRequiredOffPageNode(edges: Edge[], connector: Connector) {
  const isInput = IsInputTerminal(connector) || IsInputVisible(connector);

  const existingEdge = isInput
    ? edges.find((edge) => IsOffPage(edge.fromNode) && edge.toConnector.id === connector.id)
    : edges.find((edge) => IsOffPage(edge.toNode) && edge.fromConnector.id === connector.id);

  return existingEdge !== undefined;
}

export default HandleRequiredOffPageNode;
