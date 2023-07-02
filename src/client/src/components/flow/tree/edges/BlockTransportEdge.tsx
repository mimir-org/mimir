import { Connector, ConnectorTerminal, ConnectorDirection } from "lib";
import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
import { Color } from "../../../../assets/color/Color";
import { memo } from "react";

/**
 * Component for a TransportEdge.
 * @param params
 * @returns an edge between two transport terminals in BlockView.
 */
export const BlockTransportEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) => {
  const isElectro = false;
  const sourceConn: ConnectorTerminal = data.source.connectors?.find(
    (conn: Connector) => conn instanceof ConnectorTerminal && conn.id === data.edge?.fromConnectorId
  );
  const targetConn: ConnectorTerminal = data.source.connectors?.find(
    (conn: Connector) => conn instanceof ConnectorTerminal && conn.id === data.edge?.toConnectorId
  );
  const isBidirectional =
    sourceConn.direction === ConnectorDirection.Bidirectional || targetConn.direction === ConnectorDirection.Bidirectional;
  const visible = !data?.edge?.hidden;
  const color = sourceConn?.color ?? Color.BLACK;
  const borderRadius = 20;
  const arrowId = `arrow-${id}`;

  // Adjust to make room for marker arrow
  sourceX = SetSourceMarginForArrow(isBidirectional, isElectro, sourceX);
  targetX = SetTargetMarginForArrow(isElectro, targetX);

  const smoothPath = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius });
  const transportPath = isElectro ? GetElectroPath(sourceX, sourceY, targetX, targetY) : smoothPath;

  const style = {
    stroke: color,
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };

  return (
    <>
      <marker
        id={arrowId}
        refX="5"
        refY="5"
        markerUnits="userSpaceOnUse"
        markerWidth="10"
        markerHeight="20"
        orient={!isElectro ? "auto-start-reverse" : "auto"}
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={Color.BLACK} />
      </marker>
      <path
        id={id}
        style={style}
        className="path-blockTransportEdge"
        d={transportPath}
        markerStart={isBidirectional ? `url(#${arrowId})` : null}
        markerEnd={`url(#${arrowId})`}
      />
    </>
  );
};

function SetSourceMarginForArrow(isBidirectional: boolean, isElectro: boolean, sourceX: number) {
  const margin = 30;
  if (isElectro) return sourceX;
  if (isBidirectional) return sourceX + margin;
  return sourceX + 5;
}

function SetTargetMarginForArrow(isElectro: boolean, targetX: number) {
  const margin = 30;
  return isElectro ? targetX : targetX - margin;
}

/**
 * Function to change the transport path in vertical mode.
 * Note: this is meant as a short-term solution, until a new solution for Edges is in place.
 * @param sourceX
 * @param sourceY
 * @param targetX
 * @param targetY
 * @returns a SVG path
 */
function GetElectroPath(sourceX: number, sourceY: number, targetX: number, targetY: number) {
  const marginLarge = 27;
  const margin = 20;
  const marginSmall = 15;

  const start = `M${sourceX} ${sourceY + marginLarge}`;
  const pathSource = `S${sourceX} ${sourceY - margin * 3} ${sourceX} ${sourceY + marginSmall + margin}`;
  const pathTarget = `${targetX} ${targetY - margin * 4}  ${targetX} ${targetY - margin * 2} ${targetX} ${targetY - margin * 2}`;
  const stop = `${targetX} ${targetY - marginLarge}`;

  return `${start} ${pathSource} ${pathTarget} ${stop}`;
}

export default memo(BlockTransportEdge);
