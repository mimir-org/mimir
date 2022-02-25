import { ArrowHeadType, EdgeProps, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../models";

/**
 * Component for TransportEdges in TreeView.
 * @param params
 * @returns a horizontal transport edge between Product/Function nodes.
 */
const TreeTransportEdge = ({
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
      style={GetEdgeStyle(color, !data?.edge.isHidden)}
      className="path-transportEdge"
      d={smoothStep}
      markerEnd={markerEnd}
    />
  );
};

export const GetEdgeStyle = (color: string, visible: boolean) => {
  return {
    stroke: color,
    strokeWidth: "2px",
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };
};

export default TreeTransportEdge;
