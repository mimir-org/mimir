import { Connector, Edge, Node } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { ConvertToInterface, ConvertToTransport } from ".";


/**
 * Function to convert data to a Mimir Edge.
 * @param node
 * @param position
 * @returns an Edge.
 */
const ConvertToEdge = (
  id: string,
  sourceConn: Connector,
  targetConn: Connector,
  sourceNode: Node,
  targetNode: Node,
  projectId: string,
  library: LibraryState,
) => {
  return new Edge({
    id: id,
    projectId: projectId,
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
    transport: ConvertToTransport(sourceConn, library),
    interface: ConvertToInterface(sourceConn, library),
  } as Edge);
};

export default ConvertToEdge;
