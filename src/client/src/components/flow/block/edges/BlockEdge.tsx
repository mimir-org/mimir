import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath, Position } from "react-flow-renderer";
import { Connector } from "../../../../models";
import { electroSelector, useAppSelector } from "../../../../redux/store";
import { GetEdgeStyle, GetEdgeRelationStyle, IsLocationTerminal, IsProductTerminal } from "../../helpers";

/**
 * Component for an Edge in BlockView.
 * @param params
 * @returns a TransportEdge or RelationEdge in BlockView.
 */
const BlockEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.fromConnectorId) as Connector;
  const isTransport = !IsLocationTerminal(sourceConn) && !IsProductTerminal(sourceConn);
  const electro = useAppSelector(electroSelector);
  const visible = !data?.edge?.isHidden;
  const color = sourceConn?.color;
  const borderRadius = 20;

  const smoothPath = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius,
  });

  const bezierPath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const margin = 20;
  const start = `M${sourceX} ${sourceY}`;
  const firstAngle = `L${sourceX} ${sourceY + margin}`;
  const q = `Q${sourceX} ${sourceY + margin * 10}, ${targetX} ${targetY - margin} `;
  const c = `C ${sourceX} ${sourceY} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY - margin};`;
  const secondAngle = `L${targetX} ${targetY - margin}`;
  const stop = `L${targetX} ${targetY}`;

  const customPath = `${start} ${firstAngle} ${q}`;
  const transportPath = electro ? customPath : smoothPath;

  return isTransport ? (
    <path id={id} style={GetEdgeStyle(color, visible)} className="path-blockEdge" d={transportPath} />
  ) : (
    <path
      id={id}
      style={GetEdgeRelationStyle(data.target, visible)}
      className="path-blockEdge"
      d={bezierPath}
      markerEnd={markerEnd}
    />
  );
};

export default BlockEdge;
