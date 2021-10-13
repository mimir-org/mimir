import "./BlockEdge.scss";
import { Connector, RelationType, Aspect, Node } from "../../../models";
import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { IsLocationTerminal } from "../helpers";
import { GetStyle } from "./helpers";

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
  const fromConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge.fromConnectorId) as Connector;
  const hasLocation = IsLocationTerminal(fromConn);

  const smooth = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const bezier = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getClassName = (source: Node): string => {
    let defaultClassName = "react-flow__edge-path ";

    const sourceConn = data.source.connectors?.find(
      (x: { id: any }) => x.id === data.edge.fromConnector.id
    ) as Connector;

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
      {!hasLocation ? (
        <path id={id} style={GetStyle(fromConn)} className="react-flow__edge-path" d={smooth} markerEnd={markerEnd} />
      ) : (
        <>
          <path
            id={id}
            style={GetStyle(fromConn)}
            className={getClassName(data.source) + ""}
            d={bezier}
            markerEnd={markerEnd}
          />
          <path
            id={id}
            style={GetStyle(fromConn)}
            className={getClassName(data.source) + "--dashed"}
            d={bezier}
            markerEnd={markerEnd}
          />
        </>
      )}
    </>
  );
}
// const arrowStyle = document.body.style;
// arrowStyle.setProperty("--arrow-color", fromConnector?.color);
