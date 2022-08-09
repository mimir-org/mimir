import { ConvertToInterface, ConvertToTransport } from ".";
import { Connector, Node, Edge, Terminal } from "@mimirorg/modelbuilder-types";

import { TextResources } from "../../../assets/text/TextResources";
import { LibraryState } from "../../../redux/store/library/types";

/**
 * Function to convert data to a Mimir Edge.
 * @param id
 * @param fromConnector
 * @param toConnector
 * @param fromNode
 * @param toNode
 * @param projectId
 * @returns an Edge.
 */
export const ConvertEdgeDataToMimirEdge = (
  id: string,
  fromConnector: Connector,
  toConnector: Connector,
  fromNode: Node,
  toNode: Node,
  projectId: string,
  library: LibraryState
) => {
  const convertedTransport = ConvertToTransport(fromConnector as Terminal, toConnector as Terminal, library);
  const convertedInterface = ConvertToInterface(fromConnector as Terminal, toConnector as Terminal, library);

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
    transport: convertedTransport,
    interface: convertedInterface,
    kind: TextResources.KIND_EDGE,
  } as Edge;
};

/**
 * Function to convert data to a Mimir partOf Edge.
 * @param id
 * @param fromConnector
 * @param toConnector
 * @param fromNode
 * @param toNode
 * @param projectId
 * @returns an Edge.
 */
export const ConvertEdgeDataToMimirPartOfEdge = (
  id: string,
  fromConnector: Connector,
  toConnector: Connector,
  fromNode: Node,
  toNode: Node,
  projectId: string
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
    transport: null,
    interface: null,
    kind: TextResources.KIND_EDGE,
  } as Edge;
};
