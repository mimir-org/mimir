import { ConvertToInterface, ConvertToTransport } from ".";
import { Connector, Node, Edge } from "@mimirorg/modelbuilder-types";
import { IsTerminal } from "../helpers/Connectors";
import { TextResources } from "../../../assets/text/TextResources";

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
const ConvertEdgeDataToMimirEdge = (
  id: string,
  fromConnector: Connector,
  toConnector: Connector,
  fromNode: Node,
  toNode: Node,
  projectId: string
) => {
  const isTerminalConnector = IsTerminal(fromConnector) && IsTerminal(toConnector);
  const convertedTransport = isTerminalConnector ? ConvertToTransport(fromConnector, toConnector) : null;
  const convertedInterface = isTerminalConnector ? ConvertToInterface(fromConnector, toConnector) : null;

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

export default ConvertEdgeDataToMimirEdge;
