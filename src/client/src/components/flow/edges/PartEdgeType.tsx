import { GetAspectPartColor } from "../../../assets/helpers";
import {
  ArrowHeadType,
  getMarkerEnd,
  getSmoothStepPath,
} from "react-flow-renderer";
import "./PartEdge.scss";

export default function PartEdgeType({
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
    return {
      stroke: GetAspectPartColor(data.edge.fromNode.aspect),
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
