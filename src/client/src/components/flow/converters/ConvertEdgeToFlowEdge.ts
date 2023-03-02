import { Edge as FlowEdge } from "react-flow-renderer";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { GetVisualFilterId } from "../helpers/GetVisualFilterId";
import { EDGE_TYPE } from "../../../lib/types/enums/EdgeType";
import { VisualFilterData, VisualFilterId } from "../../../lib/models/VisualFilter";
import { ConnectorTerminal } from "../../../lib/classes/MimirConnector";
import { isHidden } from "../../../lib/helpers/isHidden";

/**
 * Function to convert a Mimir Edge to a FlowEdge that interacts with the Flow Library.
 * @param edge
 * @param edgeType
 * @param source
 * @param target
 * @param animated
 * @returns a FlowEdge.
 */
const ConvertEdgeToFlowEdge = (
  edge: Edge,
  edgeType: EDGE_TYPE,
  source: Node,
  target: Node,
  filter: VisualFilterData,
  onEdgeSplitClick: (id: string, x: number, y: number) => void
) => {
  const animated = filter.filters?.find((x) => x.id == VisualFilterId.ANIMATION)?.checked ?? false;
  const isAnimated = animated && edge.fromConnector instanceof ConnectorTerminal;
  const filterId = GetVisualFilterId(source, target, edgeType);
  const hidden = isHidden(filter, filterId.Category, filterId.Item);

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
    data: { source, target, edge, selected: edge.selected, onEdgeSplitClick },
    hidden: hidden,
    parentType: source?.aspect,
    targetType: target?.aspect,
    selected: edge.selected,
  } as FlowEdge;
};

export default ConvertEdgeToFlowEdge;
