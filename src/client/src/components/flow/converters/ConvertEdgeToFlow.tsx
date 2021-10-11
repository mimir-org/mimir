import { FlowElement } from "react-flow-renderer";
import { Connector, Edge, Node } from "../../../models";
import { EdgeType, EDGE_TYPE } from "../../../models/project";
import { IsTransportTerminal } from "../helpers";

/**
 * Function to convert a Mimir Edge to a FlowElement that interacts with the Flow library.
 * @param node
 * @param position
 * @returns a FlowElement
 */
const ConvertEdgeToFlow = (
  edge: Edge,
  edgeType: EdgeType,
  sourceNode: Node,
  targetNode: Node,
  fromConn: Connector,
  toConn: Connector
) => {
  return {
    id: edge.id,
    type: edgeType,
    source: sourceNode?.id,
    target: targetNode?.id,
    sourceHandle: fromConn?.id,
    targetHandle: toConn?.id,
    arrowHeadType: null,
    animated: edgeType === EDGE_TYPE.TRANSPORT || IsTransportTerminal(fromConn),
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
