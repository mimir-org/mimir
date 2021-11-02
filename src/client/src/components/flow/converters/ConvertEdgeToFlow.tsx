import { FlowElement } from "react-flow-renderer";
import { Edge, Node } from "../../../models";
import { EdgeType } from "../../../models/project";

/**
 * Function to convert a Mimir Edge to a FlowElement that interacts with the Flow Library.
 * @param edge
 * @param edgeType
 * @param sourceNode
 * @param targetNode
 * @returns a Flow Element.
 */
const ConvertEdgeToFlow = (edge: Edge, edgeType: EdgeType, sourceNode: Node, targetNode: Node) => {
  return {
    id: edge.id,
    type: edgeType,
    source: edge.fromNodeId,
    target: edge.toNodeId,
    sourceHandle: edge.fromConnectorId,
    targetHandle: edge.toConnectorId,
    arrowHeadType: null,
    animated: edge.animated,
    label: "",
    data: {
      source: sourceNode,
      target: targetNode,
      edge: edge,
    },
    isHidden: edge.isHidden,
    parentType: sourceNode?.aspect,
    targetType: targetNode?.aspect,
  } as FlowElement;
};

export default ConvertEdgeToFlow;
