/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connector, Terminal } from "@mimirorg/modelbuilder-types";
import { EdgeProps, getEdgeCenter, getSmoothStepPath } from "react-flow-renderer";
import styled from "styled-components";
import { Color } from "../../../../../assets/color/Color";
import { electroViewSelector, useAppSelector } from "../../../../../redux/store";
import { IsBidirectionalTerminal } from "../../../helpers/Connectors";
import { GetBlockEdgeStyle } from "../helpers/GetBlockEdgeStyle";

/**
 * Component for PartOfEdges in TreeView.
 * @param params
 * @returns an edge between nodes of the same Aspect.
 */

// TODO: Style correctly, or use existing components
const StyledButton = styled.button`
  width: 20px;
  height: 20px;
  background: #eee;
  border: 1px solid #fff;
  cursor: pointer;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1;
`;

// TODO: Style correctly and move to separate file
const StyledDiv = styled.div`
  background: transparent;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
`;
const foreignObjectSize = 40;

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
  const isElectro = useAppSelector(electroViewSelector);
  const sourceConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.fromConnectorId) as Terminal;
  const targetConn = data.source.connectors?.find((conn: Connector) => conn.id === data.edge?.toConnectorId) as Terminal;
  const isBidirectional = IsBidirectionalTerminal(sourceConn) || IsBidirectionalTerminal(targetConn);
  const visible = !data?.edge?.hidden;
  const color = sourceConn?.color ?? Color.BLACK;
  const borderRadius = 20;
  const arrowId = `arrow-${id}`;

  // Adjust to make room for marker arrow
  // sourceX = SetSourceMarginForArrow(isBidirectional, isElectro, sourceX);
  // targetX = SetTargetMarginForArrow(isElectro, targetX);

  const smoothPath = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius });
  const transportPath = isElectro ? GetElectroPath(sourceX, sourceY, targetX, targetY) : smoothPath;
  const edgePathSmoothStep = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const style = GetBlockEdgeStyle(color, !data.edge.hidden);

  const onEdgeClick = (evt, id: string, x: number, y: number) => {
    evt.stopPropagation();
    if (data.onEdgeSplitClick != null) data.onEdgeSplitClick(id, x - 10, y - 10);
  };

  const [labelX, labelY] = getEdgeCenter({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path id={id} style={style} className="path-treePartOfEdge" d={edgePathSmoothStep} />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={Number(labelX) - foreignObjectSize / 2}
        y={Number(labelY) - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <StyledDiv>
          <StyledButton className="edgebutton" onClick={(event) => onEdgeClick(event, id, labelX, labelY)}>
            +
          </StyledButton>
        </StyledDiv>
      </foreignObject>
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
