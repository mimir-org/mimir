import { EdgeProps, getSimpleBezierPath } from "react-flow-renderer";
import { Color } from "../../../../../assets/color/Color";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/Aspects";
import { useAppSelector } from "../../../../../redux/store";
import { GetBlockEdgeStyle } from "../helpers/GetBlockEdgeStyle";
import { AspectObject } from "../../../../../lib/classes/AspectObject";

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

      <path style={GetBlockEdgeStyle(sourceColor, visible)} className="path-blockRelationSourceEdge" d={bezierPath} />

      <path
        style={GetBlockEdgeStyle(targetColor, visible)}
        strokeDasharray="5,10"
        strokeLinecap="square"
        className="path-blockRelationTargetEdge"
        d={bezierPath}
        markerEnd={`url(#${arrowId})`}
      />
    </>
  );
};

function GetRelationColor(node: AspectObject) {
  if (IsFunction(node)) return Color.SUNGLOW;
  if (IsLocation(node)) return Color.MAGENTA;
  if (IsProduct(node)) return Color.ELECTRIC_BLUE;
}
