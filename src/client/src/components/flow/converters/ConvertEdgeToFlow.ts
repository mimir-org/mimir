import { Edge as FlowEdge } from "react-flow-renderer";
import { IsOffPage } from "../../../helpers/Aspects";
import { Edge, Node } from "../../../models";
import { EdgeType } from "../../../models/project";
import { IsTransport } from "../helpers/Connectors";

/**
 * Function to convert a Mimir Edge to a FlowEdge that interacts with the Flow Library.
 * @param edge
 * @param edgeType
 * @param source
 * @param target
 * @param animated
 * @returns a FlowElement.
 */
const ConvertEdgeToFlow = (edge: Edge, edgeType: EdgeType, source: Node, target: Node, animated: boolean) => {
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
    data: { source, target, edge, selected: edge.selected },
    hidden: false, // Opacity is controlled by the styled component
    parentType: source?.aspect,
    targetType: target?.aspect,
  } as FlowEdge;
};

export default ConvertEdgeToFlow;
