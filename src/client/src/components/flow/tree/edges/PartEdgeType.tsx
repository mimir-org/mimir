import "./PartEdge.scss";
import { getSmoothStepPath } from "react-flow-renderer";
import { GetAspectColor } from "../../../../helpers";
import { AspectColorType } from "../../../../models";

export default function PartEdgeType({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) {
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
      stroke: GetAspectColor(data.edge.fromNode, AspectColorType.Main),
      strokeWidth: 2,
    };
  };

  return <path id={id} style={getStyle()} className="react-flow__edge-path" d={edgePathSmoothStep} markerEnd={null} />;
}
