import { ArrowHeadType, EdgeProps, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { Connector } from "../../../../../models";
import { electroSelector, useAppSelector } from "../../../../../redux/store";
import { IsBidirectionalTerminal } from "../../../helpers";
import { GetTransportEdgeStyle } from "./helpers/GetTransportEdgeStyle";

/**
 * Component for a TransportEdge.
 * @param params
 * @returns a TransportEdge in BlockView.
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
  const electro = useAppSelector(electroSelector);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.fromConnectorId) as Connector;
  const targetConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.toConnectorId) as Connector;
  const isBidirectional = IsBidirectionalTerminal(sourceConn) || IsBidirectionalTerminal(targetConn);

  const markerStart = isBidirectional ? getMarkerEnd(ArrowHeadType.Arrow, null) : null;
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
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

  const transportPath = electro ? GetElectroPath(sourceX, sourceY, targetX, targetY) : smoothPath;

  return (
    <path
      id={id}
      style={GetTransportEdgeStyle(color, visible)}
      className="path-blockTransportEdge"
      d={transportPath}
      markerStart={markerStart}
      markerEnd={markerEnd}
    />
  );
};

// TODO: fix this in next Edge update
function GetElectroPath(sourceX: number, sourceY: number, targetX: number, targetY: number) {
  const margin = 20;
  const marginSmall = 15;

  const start = `M${sourceX} ${sourceY}`;
  const pathSource = `S${sourceX} ${sourceY - margin * 3} ${sourceX} ${sourceY + marginSmall}`;
  const pathTarget = `${targetX} ${targetY - margin * 4}  ${targetX} ${targetY - marginSmall} ${targetX} ${targetY - margin}`;
  const stop = `${targetX} ${targetY}`;

  return `${start} ${pathSource} ${pathTarget} ${stop}`;
}
