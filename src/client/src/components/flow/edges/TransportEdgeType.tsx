import { Connector, Node } from "../../../models";
import { getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";

export default function TransportEdgeType({
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
  //   const [centerX, centerY] = GetCenter({ sourceX, sourceY, targetX, targetY });

  //   const edgePathBezier = getBezierPath({
  //     sourceX,
  //     sourceY,
  //     sourcePosition,
  //     targetX,
  //     targetY,
  //     targetPosition,
  //   });

  const edgePathSmoothStep = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getStyle = () => {
    const fromConnector = data.source.connectors?.find(
      (x) => x.id === data.edge.fromConnector
    ) as Connector;

    return {
      stroke: fromConnector?.color,
      strokeWidth: 3,
    };
  };

  const pathType = (source: Node, target: Node) => {
    return edgePathSmoothStep;
    // const pathType = IsAspectNode(source.type)
    //   ? (LINE_EDGE_TYPE.STEP as LineEdgeType)
    //   : source.type !== target.type
    //   ? (LINE_EDGE_TYPE.BEZIER as LineEdgeType)
    //   : (LINE_EDGE_TYPE.STEP as LineEdgeType);

    // return pathType === LINE_EDGE_TYPE.BEZIER
    //   ? edgePathBezier
    //   : edgePathSmoothStep;
  };

  const edgeText = (source: Node, target: Node) => {
    return null;
    // let text = null;

    // if (!source || !target) return null;

    // if (IsAspectNode(source.type)) {
    //   return null;
    // } else if (source.type === target.type) {
    //   text = "partof";
    // } else if (target.type === NODE_TYPE.PRODUCT) {
    //   text = "fulfilledBy";
    // } else if (target.type === NODE_TYPE.LOCATION) {
    //   text = "locatedAt";
    // }

    // return text ? (
    //   <EdgeText
    //     x={centerX}
    //     y={centerY}
    //     label={text}
    //     //   labelStyle={labelStyle}
    //     //   labelShowBg={labelShowBg}
    //     //   labelBgStyle={labelBgStyle}
    //     //   labelBgPadding={labelBgPadding}
    //     //   labelBgBorderRadius={labelBgBorderRadius}
    //   />
    // ) : null;
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
