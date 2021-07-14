import { Connector, Edge, Node } from "../../../models";

const ConvertToEdge = (
  id: string,
  sourceConn: Connector,
  targetConn: Connector,
  sourceNode: Node,
  targetNode: Node,
  projectId: string
) => {
  return {
    id: id,
    fromConnectorId: sourceConn.id,
    fromConnector: sourceConn,
    toConnectorId: targetConn.id,
    toConnector: targetConn,
    fromNodeId: sourceNode.id,
    fromNode: sourceNode,
    toNodeId: targetNode.id,
    toNode: targetNode,
    isHidden: false,
    masterProjectId: projectId,
  } as Edge;
};

export default ConvertToEdge;
