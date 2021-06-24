import { Connector, RelationType, Aspect, Node } from "../../../models";
import {
  ArrowHeadType,
  getBezierPath,
  getMarkerEnd,
  getSmoothStepPath,
} from "react-flow-renderer";

export default function BlockEdgeType({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEndId,
}) {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, markerEndId);

  const edgePathSmoothStep = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const edgePathBezier = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const fromConnector = data.source.connectors?.find(
    (x) => x.id === data.edge.fromConnectorId
  ) as Connector;

  const hasLocation = fromConnector?.relationType === RelationType.HasLocation;

  const getStyle = () => {
    return {
      stroke: fromConnector?.color,
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
      {!hasLocation ? (
        <path
          id={id}
          style={getStyle()}
          className="react-flow__edge-path"
          d={edgePathSmoothStep}
          markerEnd={markerEnd}
        />
      ) : (
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
      )}
    </>
  );
}
// const arrowStyle = document.body.style;
// arrowStyle.setProperty("--arrow-color", fromConnector?.color);
