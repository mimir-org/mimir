import { Edge, Node } from "../../../../models";
import { EdgeType } from "../../../../models/project";
import { ConvertEdgeToFlow } from "../../converters";
import { GetSelectedNode } from "../../helpers";
import { ValidateBlockEdge } from "../../validators";

export const BuildBlockEdge = (nodes: Node[], edge: Edge, edgeType: EdgeType, secondaryNode: Node) => {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);
  const selectedNode = GetSelectedNode();

  if (ValidateBlockEdge(selectedNode, secondaryNode, edge.toNode, edge.fromNode, edge.fromConnector, edge.toConnector))
    return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode);
};

export default BuildBlockEdge;
