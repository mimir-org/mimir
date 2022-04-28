import { Edge, Node } from "../../../../models";
import { EdgeType } from "../../../../models/project";
import { ConvertEdgeToFlow } from "../../converters";
import { ValidateBlockEdge } from "./helpers";

export const BuildFlowBlockEdge = (
  nodes: Node[],
  edge: Edge,
  edgeType: EdgeType,
  selectedNode: Node,
  secondaryNode: Node,
  animated: boolean
) => {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);

  if (!sourceNode || !targetNode || !selectedNode) return;
  const isValid = ValidateBlockEdge(selectedNode, secondaryNode, sourceNode, targetNode, edge.fromConnector, edge.toConnector);

  if (isValid) return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode, animated);
};

export default BuildFlowBlockEdge;
