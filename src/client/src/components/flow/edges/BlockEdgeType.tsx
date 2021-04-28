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

import { GetTransportTypeColor, IsAspectNode } from "../helpers";

export default function BlockEdgeType({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
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

  const getConnectors = () => {
    const fromConnector = data.source.connectors.find(
      (x) => x.id === data.edge.fromConnector
    );
    const toConnector = data.target.connectors.find(
      (x) => x.id === data.edge.toConnector
    );
    return {
      fromConnector: fromConnector,
      toConnector: toConnector,
    };
  };

  const getStyle = () => {
    var connector = getConnectors().toConnector;
    return {
      stroke: GetTransportTypeColor(connector.terminalType),
    };
  };

  const pathType = (source: Node, target: Node) => {
    getConnectors();
    return edgePathSmoothStep;
    //   const pathType = isAspectNode(source.type)
    //     ? (LINE_EDGE_TYPE.STEP as LineEdgeType)
    //     : source.type !== target.type
    //     ? (LINE_EDGE_TYPE.BEZIER as LineEdgeType)
    //     : (LINE_EDGE_TYPE.STEP as LineEdgeType);

    //   return pathType === LINE_EDGE_TYPE.BEZIER
    //     ? edgePathBezier
    //     : edgePathSmoothStep;
  };

  const edgeText = (source: Node, target: Node) => {
    let text = null;

    if (!source || !target) return null;

    if (IsAspectNode(source.type)) {
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
