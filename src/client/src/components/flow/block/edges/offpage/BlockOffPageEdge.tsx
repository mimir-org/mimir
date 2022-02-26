import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { Connector } from "../../../../../models";
import { electroSelector, useAppSelector } from "../../../../../redux/store";
import { IsBidirectionalTerminal } from "../../../helpers";

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

  const transportPath = isElectro ? GetElectroPath(sourceX, sourceY, targetX, targetY) : smoothPath;

  return (
    <>
      <marker
        id="arrow"
        viewBox="0 0 10 20"
        refX="8"
        refY="5"
        markerUnits="userSpaceOnUse"
        markerWidth="10"
        markerHeight="20"
        orient={!isElectro ? "auto-start-reverse" : "auto"}
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={Color.Black} />
      </marker>
      <path
        strokeDasharray="0.3,10"
        strokeLinecap="square"
        id={id}
        style={GetOffPageEdgeStyle(color, visible)}
        className="path-blockOffPageEdge"
        d={transportPath}
        markerStart={isBidirectional ? "url(#arrow)" : null}
        markerEnd="url(#arrow)"
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

const GetOffPageEdgeStyle = (color: string, visible: boolean) => {
  return {
    stroke: color,
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };
};
