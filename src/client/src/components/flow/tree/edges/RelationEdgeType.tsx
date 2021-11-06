import "./RelationEdge.scss";
import { getBezierPath, getMarkerEnd } from "react-flow-renderer";
import { Aspect, Connector, Node, RelationType } from "../../../../models";
import { GetEdgeStyle } from "./helpers";

export default function RelationEdgeType({
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

  const bezierPath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const sourceConnector = data.source.connectors?.find((x) => x.id === data.edge.fromConnector.id);
  const color = sourceConnector?.mediaColor ?? sourceConnector?.color;

  const getClassName = (source: Node): string => {
    let defaultClassName = "react-flow__edge-path ";

    const sourceConn = data.source.connectors?.find((x: { id: any }) => x.id === data.edge.fromConnector.id) as Connector;

    switch (sourceConn?.relationType) {
      case RelationType.HasLocation:
        defaultClassName += "has-location";
        break;
      case RelationType.FulfilledBy:
        defaultClassName += "fulfilled-by";
        break;
      default:
        defaultClassName += "";
    }

    switch (source.aspect) {
      case Aspect.Product:
        defaultClassName += "-product";
        break;
      case Aspect.Function:
        defaultClassName += "-function";
        break;
      default:
        defaultClassName += "";
    }

    return defaultClassName;
  };

  return (
    <>
      <path
        id={id}
        style={GetEdgeStyle(color, !data?.edge.isHidden)}
        className={getClassName(data.source) + ""}
        d={bezierPath}
        markerEnd={markerEnd}
      />
      {/* <path
        id={id}
        style={GetStyle(color, !data?.edge.isHidden)}
        className={getClassName(data.source) + "--dashed"}
        d={bezierPath}
        markerEnd={markerEnd}
      /> */}
    </>
  );
}
