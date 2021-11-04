import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Color } from "../../../../compLibrary";
import { Connector } from "../../../../models";
import { IsLocationTerminal, IsProductTerminal } from "../../helpers";
import { GetTerminalColor } from "../terminals/helpers";
import { SetClassName, GetStyle } from "./helpers";

/**
 * Component for an Edge in BlockView.
 * @param param0
 * @returns a connection line between to Nodes.
 */
export default function BlockEdgeType({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) {
  const markerEnd = getMarkerEnd(ArrowHeadType.Arrow, null);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge.fromConnectorId) as Connector;
  const hasLocation = IsLocationTerminal(sourceConn);
  const hasProduct = IsProductTerminal(sourceConn);
  const color = GetTerminalColor(sourceConn);
  const marginX = 3;

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
        <>
          <path id={id} style={GetStyle(sourceConn)} className="react-flow__edge-path" d={smoothPath} />
          <circle cx={targetX - marginX} cy={targetY} fill={Color.White} r={3} stroke={color} strokeWidth={1.5} />
        </>
      ) : (
        <>
          <path id={id} style={GetStyle(sourceConn)} className={SetClassName(data) + ""} d={bezierPath} markerEnd={markerEnd} />
          <path
            id={id}
            style={GetStyle(sourceConn)}
            className={SetClassName(data) + "--dashed"}
            d={bezierPath}
            markerEnd={markerEnd}
          />
        </>
      )}
    </>
  );
}
