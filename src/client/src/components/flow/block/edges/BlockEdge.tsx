import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../models";
import { GetEdgeStyle, GetEdgeRelationStyle, IsLocationTerminal, IsProductTerminal } from "../../helpers";

/**
 * Component for an Edge in BlockView.
 * @param params
 * @returns a TransportEdge or RelationEdge in BlockView.
 */
const BlockEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge.fromConnectorId) as Connector;
  const hasLocation = IsLocationTerminal(sourceConn);
  const hasProduct = IsProductTerminal(sourceConn);
  const visible = !data?.edge.isHidden;
  const color = sourceConn?.color;

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
        <path id={id} style={GetEdgeStyle(color, visible)} className="path-blockEdge" d={smoothPath} markerEnd={markerEnd} />
      ) : (
        <path
          id={id}
          style={GetEdgeRelationStyle(data.target, visible)}
          className="path-blockEdge"
          d={bezierPath}
          markerEnd={markerEnd}
        />
      )}
    </>
  );
};

export default BlockEdge;
