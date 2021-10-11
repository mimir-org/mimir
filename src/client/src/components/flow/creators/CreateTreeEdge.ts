import { Edge, Node, Connector } from "../../../models";
import { EdgeType } from "../../../models/project";
import { ConvertEdgeToFlow } from "../converters";

export const CreateTreeEdge = (edge: Edge, edgeType: EdgeType, nodes: Node[]) => {
  const sourceNode = nodes?.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes?.find((node) => node.id === edge.toNodeId);

  const fromConnectorId = edge.fromConnector.id;
  let fromConnector: Connector;
  let toConnector: Connector;

  fromConnector = sourceNode.connectors.find((c) => c.id === fromConnectorId);
  toConnector = targetNode.connectors.find((c) => c.id === edge.toConnector.id);

  if (edge.fromNode && edge.toNode) {
    return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode, fromConnector, toConnector);
  }
};

export default CreateTreeEdge;
