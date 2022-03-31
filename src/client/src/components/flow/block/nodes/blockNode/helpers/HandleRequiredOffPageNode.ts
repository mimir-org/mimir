import { Dispatch } from "redux";
import { CreateRequiredOffPageNode } from "./CreateRequiredOffPageNode";
import { IsOffPage } from "../../../../../../helpers/CheckTypes";
import { Connector, Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { IsInputTerminal, IsInputVisible } from "../../../../helpers/CheckConnectorTypes";

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
    if (!conn.isRequired) return;
    const nodeExists = HasRequiredOffPageNode(edges, conn);
    if (nodeExists) return;

    const isRequired = true;
    const position = { x: size.width, y: node.positionBlockY };
    CreateRequiredOffPageNode(node, conn, position, isRequired, dispatch);
  });
};

function HasRequiredOffPageNode(edges: Edge[], connector: Connector) {
  const existingEdge =
    IsInputTerminal(connector) || IsInputVisible(connector)
      ? edges.find((edge) => IsOffPage(edge.fromNode) && edge.toConnector?.id === connector.id)
      : edges.find((edge) => IsOffPage(edge.toNode) && edge.fromConnector?.id === connector.id);

  return existingEdge !== undefined;
}

export default HandleRequiredOffPageNode;
