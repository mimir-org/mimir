import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { EdgeType } from "../../../../models/project";
import { ConvertEdgeToFlowEdge } from "../../converters";
import { ValidateSplitViewEdge } from "./helpers";

export const BuildFlowBlockEdge = (
  nodes: Node[],
  edge: Edge,
  edgeType: EdgeType,
  selectedBlockNode: Node,
  secondaryNode: Node,
  animated: boolean
) => {
  const sourceNode = nodes.find((node) => node.id === edge.fromNodeId);
  const targetNode = nodes.find((node) => node.id === edge.toNodeId);

  if (!sourceNode || !targetNode) return;
  let isValid = true;

  if (secondaryNode != undefined) {
    isValid = ValidateSplitViewEdge(
      selectedBlockNode,
      secondaryNode,
      sourceNode,
      targetNode,
      edge.fromConnector,
      edge.toConnector
    );
  }

  if (!isValid) return null;
  return ConvertEdgeToFlowEdge(edge, edgeType, sourceNode, targetNode, animated);
};

export default BuildFlowBlockEdge;
