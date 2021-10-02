import { FlowElement } from "react-flow-renderer";
import { Edge, Node } from "../../../models";
import { EdgeType, EDGE_TYPE } from "../../../models/project";
import { IsTransportTerminal } from "../helpers/common";

/**
 * Function to convert a Mimir Edge to a FlowElement that interacts with the Flow library.
 * @param node
 * @param position
 * @returns a FlowElement
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
    animated: edgeType === EDGE_TYPE.TRANSPORT || IsTransportTerminal(edge.fromConnector),
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
