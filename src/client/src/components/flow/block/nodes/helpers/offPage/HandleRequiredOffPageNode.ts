import { Dispatch } from "redux";
import { CreateRequiredOffPageNode } from ".";
import { IsOffPage } from "../../../../../../helpers";
import { Connector, Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";
import { IsInputTerminal } from "../../../../helpers";

/**
 * Component to check if any terminals have a required OffPageNode flag. If so, an OffPageNode is created.
 * OffPageNodes are not stored in our model, therefore this check is crucial to draw the needed OffPageNodes in Mimir.
 * @param node
 * @param edges
 * @param size
 * @param dispatch
 */
const HandleRequiredOffPageNode = (node: Node, edges: Edge[], size: BlockNodeSize, dispatch: Dispatch) => {
  const isRequired = true;

  node?.connectors.forEach((conn) => {
    if (conn.isRequired) {
      const offPageExists = HasRequiredOffPageNode(edges, conn);
      if (!offPageExists) CreateRequiredOffPageNode(node, conn, { x: size.width, y: node?.positionBlockY }, dispatch, isRequired);
    }
  });
};

function HasRequiredOffPageNode(edges: Edge[], connector: Connector) {
  const existingEdge = IsInputTerminal(connector)
    ? edges?.find((edge) => edge?.toConnector?.id === connector.id && IsOffPage(edge?.fromNode))
    : edges?.find((edge) => edge?.fromConnector?.id === connector.id && IsOffPage(edge?.toNode));

  return existingEdge !== undefined;
}

export default HandleRequiredOffPageNode;
