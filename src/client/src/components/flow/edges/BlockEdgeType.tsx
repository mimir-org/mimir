import { Connector } from "../../../models";
import {
  ArrowHeadType,
  getMarkerEnd,
  getSmoothStepPath,
} from "react-flow-renderer";

export default function BlockEdgeType({
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
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const getStyle = () => {
    const fromConnector = data.source.connectors?.find(
      (x) => x.id === data.edge.fromConnectorId
    ) as Connector;

    // const arrowStyle = document.body.style;
    // arrowStyle.setProperty("--arrow-color", fromConnector?.color);
    return {
      stroke: fromConnector?.color,
      strokeWidth: 2,
    };
  };

  return (
    <path
      id={id}
      style={getStyle()}
      className="react-flow__edge-path"
      d={edgePathSmoothStep}
      markerEnd={markerEnd}
    />
  );
}
