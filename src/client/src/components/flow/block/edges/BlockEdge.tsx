import { ArrowHeadType, EdgeProps, getBezierPath, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { IsOffPage } from "../../../../helpers";
import { Connector } from "../../../../models";
import { electroSelector, useAppSelector } from "../../../../redux/store";
import {
  GetEdgeStyle,
  GetEdgeRelationStyle,
  IsLocationTerminal,
  IsProductTerminal,
  IsBidirectionalTerminal,
} from "../../helpers";

/**
 * Component for an Edge in BlockView.
 * @param params
 * @returns a TransportEdge or RelationEdge in BlockView.
 */
const BlockEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const electro = useAppSelector(electroSelector);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.fromConnectorId) as Connector;
  const targetConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.toConnectorId) as Connector;
  const sourceNode = data.source;
  const targetNode = data.target;

  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
  const markerStart = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
  const isTransport = !IsLocationTerminal(sourceConn) && !IsProductTerminal(sourceConn);
  const visible = !data?.edge?.isHidden;
  const color = sourceConn?.color;
  const borderRadius = 20;
  const offPageMargin = 15;
  const bidirectionalMargin = 8;

  if (IsOffPage(targetNode)) targetX += offPageMargin;
  if (IsOffPage(sourceNode)) sourceX -= offPageMargin;
  if (IsBidirectionalTerminal(sourceConn) || IsBidirectionalTerminal(targetConn)) sourceX += bidirectionalMargin;

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
    <path
      id={id}
      style={GetEdgeStyle(color, visible)}
      className="path-blockEdge"
      d={transportPath}
      markerStart={markerStart}
      markerEnd={markerEnd}
    />
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
