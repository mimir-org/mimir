import { Connection, Position, Project } from "lib";
import { EdgeProps, getEdgeCenter, getSmoothStepPath } from "react-flow-renderer";
import { Color } from "assets/color/Color";
import { memo } from "react";
import { useMimirorgTheme } from "@mimirorg/component-library";
import styled from "styled-components";
import { projectSelector, useAppDispatch, useAppSelector } from "store";
import { onAddHandle } from "components/handlers/ProjectHandlers";

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

/**
 * Component for a block connection as edge in Flow.
 * @param params
 * @returns an edge between two transport terminals in BlockView.
 */
export const BlockConnectionTerminal = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<Connection>) => {
  const project = useAppSelector<Project>(projectSelector);
  const dispatch = useAppDispatch();
  const theme = useMimirorgTheme();
  const isElectro = false;
  const borderRadius = 20;
  const foreignObjectSize = 40;
  const arrowId = `arrow-${id}`;

  // Adjust to make room for marker arrow
  sourceX = SetSourceMarginForArrow(data.bidirectional, isElectro, sourceX);
  targetX = SetTargetMarginForArrow(isElectro, targetX);

  const smoothPath = getSmoothStepPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, borderRadius });
  const transportPath = isElectro ? GetElectroPath(sourceX, sourceY, targetX, targetY) : smoothPath;
  const onEdgeClick = (evt, id: string, x: number, y: number) => {
    evt.stopPropagation();
    const position = new Position(x, y);
    onAddHandle(id, position, position, project, dispatch);
  };

  const style = {
    stroke: data.aspectColor.terminalColor,
    opacity: !data.hidden ? 1 : 0,
    transition: "opacity 250ms",
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
        markerStart={data.bidirectional ? `url(#${arrowId})` : null}
        markerEnd={`url(#${arrowId})`}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={Number(labelX) - foreignObjectSize / 2}
        y={Number(labelY) - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <StyledDiv>
          <StyledButton className="edgebutton" onClick={(event) => onEdgeClick(event, data.id, labelX, labelY)}>
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

export default memo(BlockConnectionTerminal);
