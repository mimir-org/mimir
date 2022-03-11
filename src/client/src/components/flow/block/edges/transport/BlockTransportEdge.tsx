import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors/Color";
import { Connector } from "../../../../../models";
import { electroSelector, useAppSelector } from "../../../../../redux/store";
import { IsBidirectionalTerminal } from "../../../helpers";
import { GetEdgeStyle } from "../helpers/GetEdgeStyle";

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
  const isElectro = useAppSelector(electroSelector);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.fromConnectorId) as Connector;
  const targetConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.toConnectorId) as Connector;
  const isBidirectional = IsBidirectionalTerminal(sourceConn) || IsBidirectionalTerminal(targetConn);
  const visible = !data?.edge?.isHidden;
  const color = sourceConn?.color;
  const borderRadius = 20;
  const arrowId = `arrow-${id}`;

  // Adjust to make room for marker arrow
  const margin = 6;
  sourceX += isBidirectional ? margin / 2 : 0;
  targetX -= !isElectro ? margin : 0;

  const smoothPath = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius,
  });

  const transportPath = isElectro ? GetElectroPath(sourceX, sourceY, targetX, targetY) : smoothPath;

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
        style={GetEdgeStyle(color, visible)}
        className="path-blockTransportEdge"
        d={transportPath}
        markerStart={isBidirectional ? `url(#${arrowId})` : null}
        markerEnd={`url(#${arrowId})`}
      />
    </>
  );
};

// TODO: fix this on next Edge update
function GetElectroPath(sourceX: number, sourceY: number, targetX: number, targetY: number) {
  const margin = 20;
  const marginSmall = 15;

  const start = `M${sourceX} ${sourceY + 5}`;
  const pathSource = `S${sourceX} ${sourceY - margin * 3} ${sourceX} ${sourceY + marginSmall}`;
  const pathTarget = `${targetX} ${targetY - margin * 4}  ${targetX} ${targetY - margin} ${targetX} ${targetY - margin * 2}`;
  const stop = `${targetX} ${targetY - 5}`;

  return `${start} ${pathSource} ${pathTarget} ${stop}`;
}
