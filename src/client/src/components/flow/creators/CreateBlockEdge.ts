import { ShowBlockViewEdge } from "../block/helpers";
import { Connector, Edge, Node } from "../../../models";
import { EdgeType } from "../../../models/project";
import { ConvertEdgeToFlow } from "../converters";

export const CreateBlockEdge = (nodes: Node[], edge: Edge, edgeType: EdgeType) => {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);

  let fromConnector: Connector;
  let toConnector: Connector;

  fromConnector = sourceNode.connectors.find((c) => c.id === edge.fromConnectorId);
  toConnector = targetNode.connectors.find((c) => c.id === edge.toConnectorId);

  if (ShowBlockViewEdge(edge)) {
    return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode, fromConnector, toConnector);
  }
};

export default CreateBlockEdge;
