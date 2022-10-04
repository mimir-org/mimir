import { Dispatch } from "redux";
import { CreateRequiredOffPageNode } from "./CreateRequiredOffPageNode";
import { IsOffPage } from "../../../../../../helpers/Aspects";
import { BlockNodeSize, OffPageData } from "../../../../../../models/project";
import { IsInputConnector, IsInputVisible, IsTerminal } from "../../../../helpers/Connectors";
import { Node, Edge, Connector } from "@mimirorg/modelbuilder-types";
import { CreateId } from "../../../../helpers";

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

  node.connectors.forEach((connector) => {
    if (!IsTerminal(connector) || !connector.isRequired || HasRequiredOffPageNode(edges, connector)) return;

    const position = { x: size.width, y: node.positionBlockY };

    const data = {
      offPageNodeId: CreateId(),
      sourceNode: node,
      sourceConnector: connector,
      position,
      isRequired: true,
    } as OffPageData;

    CreateRequiredOffPageNode(data, dispatch);
  });
};

/**
 * Function to check if a connector already has a required OffPageNode.
 * @param edges
 * @param connector
 * @returns a boolean value.
 */
function HasRequiredOffPageNode(edges: Edge[], connector: Connector) {
  const isInput = IsInputConnector(connector) || IsInputVisible(connector);

  const existingEdge = isInput
    ? edges.find((edge) => IsOffPage(edge.fromNode) && edge.toConnector.id === connector.id)
    : edges.find((edge) => IsOffPage(edge.toNode) && edge.fromConnector.id === connector.id);

  return existingEdge != undefined;
}

export default HandleRequiredOffPageNode;
