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

  // Force edge to fit the terminals
  //   targetY += 40;
  //   sourceY += 40;

  const edgePathSmoothStep = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const getStyle = () => {
    // console.log(data.source);
    // console.log(data.edge);
    const fromConnector = data.source.connectors.find(
      (x) => x.id === data.edge.fromConnector
    ) as Connector;

    return {
      stroke: fromConnector?.color,
      strokeWidth: 2,
    };
  };

  return (
    <>
      <path
        id={id}
        style={getStyle()}
        className="react-flow__edge-path"
        d={edgePathSmoothStep}
        markerEnd={markerEnd}
      />
    </>
  );
}
