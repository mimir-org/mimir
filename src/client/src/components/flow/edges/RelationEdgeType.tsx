import { getBezierPath, getMarkerEnd } from "react-flow-renderer";
import { Aspect, Connector, Node, RelationType } from "../../../models";
import "./RelationEdge.scss";

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

  const edgePathBezier = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getStyle = () => {
    const fromConnector = data.source.connectors?.find(
      (x: { id: any }) => x.id === data.edge.fromConnector.id
    );

    return {
      stroke: fromConnector?.mediaColor,
      strokeWidth: 2,
    };
  };

  const getClassName = (source: Node, target: Node): string => {
    let defaultClassName = "react-flow__edge-path ";

    const fromConnector = data.source.connectors?.find(
      (x: { id: any }) => x.id === data.edge.fromConnector.id
    ) as Connector;

    switch (fromConnector?.relationType) {
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
        style={getStyle()}
        className={getClassName(data.source, data.target) + ""}
        d={edgePathBezier}
        markerEnd={markerEnd}
      />
      <path
        id={id}
        style={getStyle()}
        className={getClassName(data.source, data.target) + "--dashed"}
        d={edgePathBezier}
        markerEnd={markerEnd}
      />
    </>
  );
}
