import { memo } from "react";
import { EdgeProps, getEdgeCenter, getSmoothStepPath } from "react-flow-renderer";
import { GetAspectColor } from "../../../../../helpers";
import { AspectColorType } from "../../../../../models";
import { GetTreeEdgeStyle } from "../helpers/GetTreeEdgeStyle";
import styled from "styled-components";

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

const TreePartOfEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  // const project = useAppSelector(projectSelector);
  const color = GetAspectColor(data.edge.fromNode, AspectColorType.Main);
  const style = GetTreeEdgeStyle(color, !data.edge.hidden);
  const edgePathSmoothStep = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  // const dispatch = useDispatch();
  const [labelX, labelY] = getEdgeCenter({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = (evt, id: string, x: number, y: number) => {
    evt.stopPropagation();
    if (data.onEdgeSplitClick != null) data.onEdgeSplitClick(id, x - 10, y - 10);
  };

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

export default memo(TreePartOfEdge);
