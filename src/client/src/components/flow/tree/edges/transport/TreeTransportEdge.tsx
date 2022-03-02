import { ArrowHeadType, EdgeProps, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../../models";
import { GetTreeEdgeStyle } from "../helpers/GetTreeEdgeStyle";

/**
 * Component for TransportEdges in TreeView.
 * @param params
 * @returns a horizontal transport edge between Product/Function nodes.
 */
export const TreeTransportEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEndId,
}: EdgeProps) => {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, markerEndId);
  const sourceConnector = data.source.connectors?.find((x) => x.id === data.edge.fromConnector.id) as Connector;
  const color = sourceConnector?.color;

  const smoothStep = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={GetTreeEdgeStyle(color, !data?.edge.isHidden)}
      className="path-treeTransportEdge"
      d={smoothStep}
      markerEnd={markerEnd}
    />
  );
};
