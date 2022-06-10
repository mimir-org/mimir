import { LibraryState } from "../../../redux/store/library/types";
import { ConvertToInterface, ConvertToTransport } from ".";
import { Connector, Node, Edge } from "@mimirorg/modelbuilder-types";

/**
 * Function to convert data to a Mimir Edge.
 * @param id
 * @param fromConnector
 * @param toConnector
 * @param fromNode
 * @param toNode
 * @param projectId
 * @param library
 * @returns an Edge.
 */
const ConvertDataToEdge = (
  id: string,
  fromConnector: Connector,
  toConnector: Connector,
  fromNode: Node,
  toNode: Node,
  projectId: string,
  library: LibraryState
) => {
  return {
    id,
    projectId,
    fromConnectorId: fromConnector.id,
    fromConnector,
    toConnectorId: toConnector.id,
    toConnector,
    fromNodeId: fromNode.id,
    fromNode,
    toNodeId: toNode.id,
    toNode,
    hidden: false,
    masterProjectId: projectId,
    transport: ConvertToTransport(fromConnector, library),
    interface: ConvertToInterface(fromConnector, library),
    kind: "Edge",
  } as Edge;
};

export default ConvertDataToEdge;
