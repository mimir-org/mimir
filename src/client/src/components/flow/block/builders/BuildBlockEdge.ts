import { Edge, Node } from "../../../../models";
import { EdgeType } from "../../../../models/project";
import { ConvertEdgeToFlow } from "../../converters";
import { GetSelectedNode } from "../../../../helpers";
import { ValidateBlockEdge } from "../../validators";

export const BuildBlockEdge = (nodes: Node[], edge: Edge, edgeType: EdgeType, secondaryNode: Node, animated: boolean) => {
  console.log("childedge: ", edge);

  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);
  const selectedNode = GetSelectedNode();

  if (ValidateBlockEdge(selectedNode, secondaryNode, edge.fromNode, edge.toNode, edge.fromConnector, edge.toConnector))
    return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode, animated);
};

export default BuildBlockEdge;
