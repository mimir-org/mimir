import { ArrowHeadType, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../models";
import { GetEdgeStyle } from "./helpers";

export default function TransportEdgeType({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEndId,
}) {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, markerEndId);

  const smoothStep = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const fromConnector = data.source.connectors?.find((x) => x.id === data.edge.fromConnector.id) as Connector;
  const color = fromConnector?.color;

  return (
    <path
      id={id}
      style={GetEdgeStyle(color, !data?.edge.isHidden)}
      className="path-edgeTransport"
      d={smoothStep}
      markerEnd={markerEnd}
    />
  );
}
