import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../models";
import { IsLocationTerminal, IsProductTerminal } from "../../helpers";
import { SetClassName, GetStyle } from "./helpers";

/**
 * Component for an Edge in BlockView.
 * @param param0
 * @returns a connection line between to Nodes.
 */
export default function BlockEdgeType({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge.fromConnectorId) as Connector;
  const hasLocation = IsLocationTerminal(sourceConn);
  const hasProduct = IsProductTerminal(sourceConn);
  const visible = !data?.edge.isHidden;

  const smoothPath = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const bezierPath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {!hasLocation && !hasProduct ? (
        <path
          id={id}
          style={GetStyle(sourceConn, visible)}
          className="react-flow__edge-path"
          d={smoothPath}
          markerEnd={markerEnd}
        />
      ) : (
        <>
          <path
            id={id}
            style={GetStyle(sourceConn, visible)}
            className={SetClassName(data) + ""}
            d={bezierPath}
            markerEnd={markerEnd}
          />
          <path
            id={id}
            style={GetStyle(sourceConn, visible)}
            className={SetClassName(data) + "--dashed"}
            d={bezierPath}
            markerEnd={markerEnd}
          />
        </>
      )}
    </>
  );
}
