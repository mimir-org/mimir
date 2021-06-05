import { IsAspectNode, GetCenter } from "../helpers/common";
import {
  getBezierPath,
  getMarkerEnd,
  getSmoothStepPath,
  EdgeText,
  ArrowHeadType,
} from "react-flow-renderer";
import {
  LINE_EDGE_TYPE,
  LineEdgeType,
  Node,
  NODE_TYPE,
  Connector,
  RELATION_TYPE,
} from "../../../models/project";
import "./RelationEdge.scss";

export default function RelationEdgeType({
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

  const getStyle = () => {
    const fromConnector = data.source.connectors.find(
      (x: { id: any }) => x.id === data.edge.fromConnector
    );

    return {
      stroke: fromConnector?.mediaColor,
      strokeWidth: 3,
    };
  };

  const getClassName = (source: Node, target: Node): string => {
    let defaultClassName = "react-flow__edge-path ";

    const fromConnector = data.source.connectors.find(
      (x: { id: any }) => x.id === data.edge.fromConnector
    ) as Connector;

    switch (fromConnector.relationType) {
      case RELATION_TYPE.HasLocation:
        defaultClassName += "has-location";
        break;
      case RELATION_TYPE.FulfilledBy:
        defaultClassName += "fulfilled-by";
        break;
      default:
        defaultClassName += "";
    }

    switch (source.type) {
      case NODE_TYPE.PRODUCT:
        defaultClassName += "-product";
        break;
      case NODE_TYPE.FUNCTION:
        defaultClassName += "-function";
        break;
      default:
        defaultClassName += "";
    }

    return defaultClassName;
  };

  const pathType = (source: Node, target: Node) => {
    return edgePathBezier;
    // const pathType = IsAspectNode(source.type)
    //   ? (LINE_EDGE_TYPE.STEP as LineEdgeType)
    //   : source.type !== target.type
    //   ? (LINE_EDGE_TYPE.BEZIER as LineEdgeType)
    //   : (LINE_EDGE_TYPE.STEP as LineEdgeType);

    // return pathType === LINE_EDGE_TYPE.BEZIER
    //   ? edgePathBezier
    //   : edgePathSmoothStep;
  };

  const pathClick = () => {};

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
    //   text = "HasLocation";
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

  //   document.addEventListener(
  //     "click",
  //     function (event) {
  //       var target = event.target as HTMLInputElement;

  //       // console.log(event.currentTarget.value, id, event);
  //       if (target.id === id) {
  //         console.log(event.target);
  //       }

  //       //   console.log(event.target);
  //     },
  //     false
  //   );

  return (
    <>
      <path
        id={id}
        style={getStyle()}
        className={getClassName(data.source, data.target) + ""}
        d={pathType(data.source, data.target)}
        markerEnd={markerEnd}
      />
      <path
        id={id}
        style={getStyle()}
        className={getClassName(data.source, data.target) + "--dashed"}
        d={pathType(data.source, data.target)}
        markerEnd={markerEnd}
      />
      {edgeText(data.source, data.target)}
    </>
  );
}
