import { ArrowHeadType, EdgeProps, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../../models";
import { electroSelector, useAppSelector } from "../../../../../redux/store";
import { IsBidirectionalTerminal } from "../../../helpers";

/**
 * Component for an OffPageEdge.
 * @param params
 * @returns an OffPageEdge in BlockView.
 */
export const BlockOffPageEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const electro = useAppSelector(electroSelector);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.fromConnectorId) as Connector;
  const targetConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.toConnectorId) as Connector;
  const isBidirectional = IsBidirectionalTerminal(sourceConn) || IsBidirectionalTerminal(targetConn);

  const markerStart = isBidirectional ? getMarkerEnd(ArrowHeadType.Arrow, null) : null;
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
  const visible = !data?.edge?.isHidden;
  const color = sourceConn?.color;
  const borderRadius = 20;
  const offPageMargin = 15;

  targetX += offPageMargin;
  sourceX -= offPageMargin;

  const smoothPath = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius,
  });

  const transportPath = electro ? GetElectroPath(sourceX, sourceY, targetX, targetY) : smoothPath;

  return (
    <path
      id={id}
      style={GetOffPageEdgeStyle(color, visible)}
      className="path-blockOffPageEdge"
      d={transportPath}
      markerStart={markerStart}
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

const GetOffPageEdgeStyle = (color: string, visible: boolean) => {
  return {
    stroke: color,
    strokeWidth: "2px",
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };
};
