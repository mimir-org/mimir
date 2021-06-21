import { Node } from "../../../models";
import { getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { GetAspectPartColor } from "../../../assets/helpers";
import "./PartEdge.scss";

export default function PartEdgeType({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}) {
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

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
      strokeWidth: 3,
    };
  };

  const pathType = (source: Node, target: Node) => {
    return edgePathSmoothStep;
  };

  const edgeText = (source: Node, target: Node) => {
    return null;
  };

  return (
    <>
      <path
        id={id}
        style={getStyle()}
        className="react-flow__edge-path"
        d={pathType(data.source, data.target)}
        markerEnd={markerEnd}
      />
      {edgeText(data.source, data.target)}
    </>
  );
}
