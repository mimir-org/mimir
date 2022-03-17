import { Dispatch } from "redux";
import { CreateRequiredOffPageNode } from "./CreateRequiredOffPageNode";
import { IsOffPage } from "../../../../../../helpers";
import { Connector, Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { IsInputTerminal, IsInputVisible } from "../../../../helpers";

/**
 * Component to check if any terminals have a required OffPageNode flag. If so, an OffPageNode is created.
 * OffPageNodes are not stored in our model/database, therefore this check is crucial to draw the needed OffPageNodes in Mimir.
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
  const isRequired = true;

  node?.connectors.forEach((conn) => {
    if (conn.isRequired) {
      const offPageExists = RequiredOffPageNodeExists(edges, conn);
      if (!offPageExists)
        CreateRequiredOffPageNode(node, conn, { x: size.width, y: node?.positionBlockY }, splitView, isRequired, dispatch);
    }
  });
};

function RequiredOffPageNodeExists(edges: Edge[], connector: Connector) {
  const existingEdge =
    IsInputTerminal(connector) || IsInputVisible(connector)
      ? edges?.find((edge) => edge?.toConnector?.id === connector.id && IsOffPage(edge?.fromNode))
      : edges?.find((edge) => edge?.fromConnector?.id === connector.id && IsOffPage(edge?.toNode));

  return existingEdge !== undefined;
}

export default HandleRequiredOffPageNode;
