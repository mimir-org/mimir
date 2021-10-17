import "./BlockEdge.scss";
import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../models";
import { IsLocationTerminal } from "../../helpers";
import { SetClassName, GetStyle } from "./helpers";

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

  return (
    <>
      {!hasLocation ? (
        <path id={id} style={GetStyle(fromConn)} className="react-flow__edge-path" d={smooth} markerEnd={markerEnd} />
      ) : (
        <>
          <path
            id={id}
            style={GetStyle(fromConn)}
            className={SetClassName(data) + ""}
            d={bezier}
            markerEnd={markerEnd}
          />
          <path
            id={id}
            style={GetStyle(fromConn)}
            className={SetClassName(data) + "--dashed"}
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
