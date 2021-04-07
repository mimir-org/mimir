import {
  getBezierPath,
  getMarkerEnd,
  getSmoothStepPath,
  EdgeText,
} from "react-flow-renderer";
import { getCenter } from "../utils";
import {
  LINE_EDGE_TYPE,
  LineEdgeType,
  Node,
  NODE_TYPE,
} from "../../../models/project";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { EdgeFlowWrapper } from "../styled";

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
  const [centerX, centerY] = getCenter({ sourceX, sourceY, targetX, targetY });

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
    const pathType =
      source.type === NODE_TYPE.ASPECT
        ? (LINE_EDGE_TYPE.STEP as LineEdgeType)
        : source.type !== target.type
        ? (LINE_EDGE_TYPE.BEZIER as LineEdgeType)
        : (LINE_EDGE_TYPE.STEP as LineEdgeType);
    return pathType === LINE_EDGE_TYPE.BEZIER
      ? edgePathBezier
      : edgePathSmoothStep;
  };

  const edgeText = (source: Node, target: Node) => {
    let text = null;

    if (!source || !target) return null;

    if (source.type === NODE_TYPE.ASPECT) {
      return null;
    } else if (source.type === target.type) {
      text = "partof";
    } else if (target.type === NODE_TYPE.PRODUCT) {
      text = "fulfilledBy";
    } else if (target.type === NODE_TYPE.LOCATION) {
      text = "locatedAt";
    }

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

  const edges: any = useSelector<RootState>(
    (state) => state.projectState.project.edges
  );
  const edge = edges.find((node) => node.id === id);
  const isVisible = edge.isVisible;

  return (
    <EdgeFlowWrapper visible={isVisible}>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={pathType(data.source, data.target)}
        markerEnd={markerEnd}
      />
      {edgeText(data.source, data.target)}
    </EdgeFlowWrapper>
  );
}
