import { Connector, Edge, Node } from "../../../models";

const ConvertToEdge = (
  id: string,
  fromConnector: Connector,
  toConnector: Connector,
  sourceNode: Node,
  targetNode: Node,
  projectId: string
) => {
  return {
    id: id,
    fromConnectorId: fromConnector.id,
    fromConnector: fromConnector,
    toConnectorId: toConnector.id,
    toConnector: toConnector,
    fromNodeId: sourceNode.id,
    fromNode: sourceNode,
    toNodeId: targetNode.id,
    toNode: targetNode,
    isHidden: false,
    masterProjectId: projectId,
  } as Edge;
};

export default ConvertToEdge;
