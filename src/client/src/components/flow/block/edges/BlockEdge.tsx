import { ArrowHeadType, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
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

  const transportPath = electro ? GetElectroPath(sourceX, sourceY, targetX, targetY) : smoothPath;

  return isTransport ? (
    <path id={id} style={GetEdgeStyle(color, visible)} className="path-blockEdge" d={transportPath} markerEnd={markerEnd} />
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

function GetElectroPath(sourceX: number, sourceY: number, targetX: number, targetY: number) {
  const margin = 20;
  const marginSmall = 15;

  const start = `M${sourceX} ${sourceY}`;
  const pathSource = `S${sourceX} ${sourceY - margin * 3} ${sourceX} ${sourceY + marginSmall}`;
  const pathTarget = `${targetX} ${targetY - margin * 4}  ${targetX} ${targetY - marginSmall} ${targetX} ${targetY - margin}`;
  const stop = `${targetX} ${targetY}`;

  return `${start} ${pathSource} ${pathTarget} ${stop}`;
}

export default BlockEdge;
