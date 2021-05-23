import { IsAspectNode, GetCenter } from "../helpers";
import {
  getBezierPath,
  getMarkerEnd,
  getSmoothStepPath,
  EdgeText,
} from "react-flow-renderer";
import {
  LINE_EDGE_TYPE,
  LineEdgeType,
  Node,
  NODE_TYPE,
} from "../../../models/project";

export default function DefaultEdgeType({
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
  const [centerX, centerY] = GetCenter({ sourceX, sourceY, targetX, targetY });

  const edgePathBezier = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgePathSmoothStep = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const pathType = (source: Node, target: Node) => {
    const pathType = IsAspectNode(source.type)
      ? (LINE_EDGE_TYPE.STEP as LineEdgeType)
      : source.type !== target.type
      ? (LINE_EDGE_TYPE.BEZIER as LineEdgeType)
      : (LINE_EDGE_TYPE.STEP as LineEdgeType);

    return pathType === LINE_EDGE_TYPE.BEZIER
      ? edgePathBezier
      : edgePathSmoothStep;
  };

  const edgeText = (source: Node, target: Node) => {
    if (!source || !target || IsAspectNode(source.type)) return null;
    let text = null;

    source.type === target.type
      ? (text = "partof")
      : target.type === NODE_TYPE.PRODUCT
      ? (text = "fulfilledBy")
      : target.type === NODE_TYPE.LOCATION
      ? (text = "locatedAt")
      : (text = null);

    return text ? (
      <EdgeText
        x={centerX}
        y={centerY}
        label={text}
        //   labelStyle={labelStyle}
        //   labelShowBg={labelShowBg}
        //   labelBgStyle={labelBgStyle}
        //   labelBgPadding={labelBgPadding}
        //   labelBgBorderRadius={labelBgBorderRadius}
      />
    ) : null;
  };

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={pathType(data.source, data.target)}
        markerEnd={markerEnd}
      />
      {edgeText(data.source, data.target)}
    </>
  );
}
