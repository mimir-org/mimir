import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../models";
import { GetEdgeStyle, GetRelationEdgeStyle, IsLocationTerminal, IsProductTerminal } from "../../helpers";

/**
 * Component for an Edge in BlockView.
 * @param params
 * @returns a connection line between two Nodes.
 */
export default function BlockEdgeType({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge.fromConnectorId) as Connector;
  const hasLocation = IsLocationTerminal(sourceConn);
  const hasProduct = IsProductTerminal(sourceConn);
  const visible = !data?.edge.isHidden;

  const sourceConnector = data.source.connectors?.find((x) => x.id === data.edge.fromConnector.id) as Connector;
  const color = sourceConnector?.color;

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
          style={GetEdgeStyle(color, visible)}
          className="react-flow__edge-path"
          d={smoothPath}
          markerEnd={markerEnd}
        />
      ) : (
        <path
          id={id}
          style={GetRelationEdgeStyle(data.target, visible)}
          className="react-flow__edge-path"
          d={bezierPath}
          markerEnd={markerEnd}
        />
      )}
    </>
  );
}
