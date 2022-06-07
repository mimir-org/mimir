import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
import { Color } from "../../../../../assets/color/Color";
import { Connector } from "../../../../../models";
import { electroSelector, useAppSelector } from "../../../../../redux/store";
import { IsBidirectionalTerminal } from "../../../helpers/Connectors";
import { GetBlockEdgeStyle } from "../helpers/GetBlockEdgeStyle";

/**
 * Component for an OffPageEdge.
 * @param params
 * @returns an OffPageEdge in BlockView.
 */
export const BlockOffPageEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const isElectro = useAppSelector(electroSelector);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.fromConnectorId) as Connector;
  const targetConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.toConnectorId) as Connector;
  const isBidirectional = IsBidirectionalTerminal(sourceConn) || IsBidirectionalTerminal(targetConn);
  const visible = !data?.edge?.hidden;
  const color = sourceConn?.color;
  const borderRadius = 20;
  const arrowId = `arrow-${id}`;

  const smoothPath = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius });
  const transportPath = isElectro ? GetElectroPath(sourceX, sourceY, targetX, targetY) : smoothPath;

  return (
    <>
      <marker
        id={arrowId}
        refX="8"
        refY="5"
        markerUnits="userSpaceOnUse"
        markerWidth="10"
        markerHeight="20"
        orient={!isElectro ? "auto-start-reverse" : "auto"}
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={Color.BLACK} />
      </marker>
      <path
        strokeDasharray="0.3,10"
        strokeLinecap="square"
        id={id}
        style={GetBlockEdgeStyle(color, visible)}
        className="path-blockOffPageEdge"
        d={transportPath}
        markerStart={isBidirectional ? `url(#${arrowId})` : null}
        markerEnd={`url(#${arrowId})`}
      />
    </>
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
