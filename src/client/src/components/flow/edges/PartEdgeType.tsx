import "./PartEdge.scss";
import { GetAspectPartColor } from "../../../assets/helpers";
import { getSmoothStepPath } from "react-flow-renderer";

export default function PartEdgeType({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) {
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
      markerEnd={null}
    />
  );
}
