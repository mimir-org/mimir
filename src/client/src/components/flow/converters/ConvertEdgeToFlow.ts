import { Edge as FlowEdge } from "react-flow-renderer";
import { IsOffPage } from "../../../helpers/CheckTypes";
import { Edge, Node } from "../../../models";
import { EdgeType } from "../../../models/project";
import { IsTransport } from "../helpers/CheckConnectorTypes";

/**
 * Function to convert a Mimir Edge to a FlowEdge that interacts with the Flow Library.
 * @param edge
 * @param edgeType
 * @param sourceNode
 * @param targetNode
 * @param animated
 * @returns a FlowElement.
 */
const ConvertEdgeToFlow = (edge: Edge, edgeType: EdgeType, sourceNode: Node, targetNode: Node, animated: boolean) => {
  const isAnimated = animated && IsTransport(edge.fromConnector) && !IsOffPage(edge.fromNode) && !IsOffPage(edge.toNode);

  return {
    id: edge.id,
    type: edgeType,
    source: edge.fromNodeId,
    target: edge.toNodeId,
    sourceHandle: edge.fromConnectorId,
    targetHandle: edge.toConnectorId,
    arrowHeadType: null,
    animated: isAnimated,
    label: "",
    data: {
      source: sourceNode,
      target: targetNode,
      edge: edge,
      isSelected: edge.isSelected,
    },
    isHidden: false, // Opacity is controlled by the styled component
    parentType: sourceNode?.aspect,
    targetType: targetNode?.aspect,
  } as FlowEdge;
};

export default ConvertEdgeToFlow;
