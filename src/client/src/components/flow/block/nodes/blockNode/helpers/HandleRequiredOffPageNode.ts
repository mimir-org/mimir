import { Dispatch } from "redux";
import { CreateRequiredOffPageNode } from "./CreateRequiredOffPageNode";
import { IsOffPage } from "../../../../../../helpers";
import { Connector, Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { IsInputTerminal, IsInputVisible } from "../../../../helpers";

/**
 * Component to check if any terminals have a required OffPageNode flag. If so, an OffPageNode is created.
 * OffPageNodes are not stored in our model/database, therefore this check is crucial to draw the needed OffPageNodes in Mimir.
 * This component is called from the BlockNode component.
 * @param node
 * @param edges
 * @param size
 * @param splitView
 * @param dispatch
 */
export const HandleRequiredOffPageNode = (
  node: Node,
  edges: Edge[],
  size: BlockNodeSize,
  splitView: boolean,
  dispatch: Dispatch
) => {
  node?.connectors.forEach((conn) => {
    if (conn.isRequired) {
      const offPageExists = DoesOffPageNodeExist(edges, conn);
      if (!offPageExists) {
        const isRequired = true;
        const position = { x: size.width, y: node?.positionBlockY };
        CreateRequiredOffPageNode(node, conn, position, splitView, isRequired, dispatch);
      }
    }
  });
};

function DoesOffPageNodeExist(edges: Edge[], connector: Connector) {
  const existingEdge =
    IsInputTerminal(connector) || IsInputVisible(connector)
      ? edges?.find((edge) => edge?.toConnector?.id === connector.id && IsOffPage(edge?.fromNode))
      : edges?.find((edge) => edge?.fromConnector?.id === connector.id && IsOffPage(edge?.toNode));

  return existingEdge !== undefined;
}

export default HandleRequiredOffPageNode;
