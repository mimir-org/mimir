import "./TransportEdge.scss";
import { ArrowHeadType, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../models";

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

  const edgePathSmoothStep = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getStyle = () => {
    const fromConnector = data.source.connectors?.find((x) => x.id === data.edge.fromConnector.id) as Connector;

    return {
      stroke: fromConnector?.color,
      strokeWidth: 2,
    };
  };

  return (
    <path id={id} style={getStyle()} className="react-flow__edge-path" d={edgePathSmoothStep} markerEnd={markerEnd} />
  );
}
