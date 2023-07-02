import { EdgeProps, getSimpleBezierPath } from "react-flow-renderer";
import { Color } from "../../../../assets/color/Color";
import { GetRelationColor } from "assets";
import { memo } from "react";

/**
 * Component for a RelationEdge. The color of the RelationEdge is a combination of the sourceNode and targetNode's AspectColor.
 * @param params
 * @returns a hasLocation or fullfilledBy edge in BlockView.
 */
export const BlockRelationEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) => {
  const visible = !data?.edge?.hidden;
  const isElectro = false;
  const sourceColor = GetRelationColor(data.source);
  const targetColor = GetRelationColor(data.target);
  const arrowId = `arrow-${id}`;

  // Adjust to make room for marker arrow
  const margin = 28;
  sourceX += margin;
  targetX -= margin;
  sourceY += margin;
  targetY -= margin;

  const sourceStyle = {
    stroke: sourceColor,
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };

  const targetStyle = {
    stroke: targetColor,
    opacity: visible ? 1 : 0,
    transition: "opacity 250ms",
  };

  const bezierPath = getSimpleBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

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

      <path style={sourceStyle} className="path-blockRelationSourceEdge" d={bezierPath} />

      <path
        style={targetStyle}
        strokeDasharray="5,10"
        strokeLinecap="square"
        className="path-blockRelationTargetEdge"
        d={bezierPath}
        markerEnd={`url(#${arrowId})`}
      />
    </>
  );
};

export default memo(BlockRelationEdge);
