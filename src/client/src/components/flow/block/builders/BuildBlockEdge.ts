import { Elements } from "react-flow-renderer";
import { Edge, Node } from "../../../../models";
import { EdgeType } from "../../../../models/project";
import { ConvertEdgeToFlow } from "../../converters";
import { GetSelectedNode } from "../../../../helpers";
import { ValidateBlockEdge } from "../../validators";

export const BuildBlockEdge = (
  nodes: Node[],
  edge: Edge,
  edgeType: EdgeType,
  secondaryNode: Node,
  animated: boolean,
  elements: Elements<any>
) => {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);
  const selectedNode = GetSelectedNode();

  if (sourceNode && targetNode) {
    if (ValidateBlockEdge(selectedNode, secondaryNode, sourceNode, targetNode, edge.fromConnector, edge.toConnector, elements))
      return ConvertEdgeToFlow(edge, edgeType, sourceNode, targetNode, animated);
  }
};

export default BuildBlockEdge;
