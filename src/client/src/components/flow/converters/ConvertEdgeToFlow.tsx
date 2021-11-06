import { FlowElement } from "react-flow-renderer";
import { Edge, Node } from "../../../models";
import { EdgeType } from "../../../models/project";
import { IsTransport } from "../helpers";

/**
 * Function to convert a Mimir Edge to a FlowElement that interacts with the Flow Library.
 * @param edge
 * @param edgeType
 * @param sourceNode
 * @param targetNode
 * @param animated
 * @returns a Flow Element.
 */
const ConvertEdgeToFlow = (edge: Edge, edgeType: EdgeType, sourceNode: Node, targetNode: Node, animated: boolean) => {
  return {
    id: edge.id,
    type: edgeType,
    source: edge.fromNodeId,
    target: edge.toNodeId,
    sourceHandle: edge.fromConnectorId,
    targetHandle: edge.toConnectorId,
    arrowHeadType: null,
    animated: animated && IsTransport(edge.fromConnector),
    label: "",
    data: {
      source: sourceNode,
      target: targetNode,
      edge: edge,
    },
    isHidden: false, // Opacity is controlled by the styled component
    parentType: sourceNode?.aspect,
    targetType: targetNode?.aspect,
  } as FlowElement;
};

export default ConvertEdgeToFlow;
