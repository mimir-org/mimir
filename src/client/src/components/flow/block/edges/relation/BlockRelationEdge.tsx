import { EdgeProps, getBezierPath } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { Node } from "../../../../../models";
import { useAppSelector, electroSelector } from "../../../../../redux/store";
import { GetEdgeStyle } from "../helpers/GetEdgeStyle";

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
  const visible = !data?.edge?.isHidden;
  const isElectro = useAppSelector(electroSelector);
  const sourceColor = GetRelationColor(data.source);
  const targetColor = GetRelationColor(data.target);
  const arrowId = `arrow-${id}`;

  // Adjust to make room for marker arrow
  const margin = 6;
  targetX -= !isElectro ? margin : 0;

  const bezierPath = getBezierPath({
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

      <path style={GetEdgeStyle(sourceColor, visible)} className="path-blockRelationSourceEdge" d={bezierPath} />

      <path
        style={GetEdgeStyle(targetColor, visible)}
        strokeDasharray="5,10"
        strokeLinecap="square"
        className="path-blockRelationTargetEdge"
        d={bezierPath}
        markerEnd={`url(#${arrowId})`}
      />
    </>
  );
};

function GetRelationColor(node: Node) {
  if (IsFunction(node)) return Color.FUNCTION_SELECTED;
  if (IsLocation(node)) return Color.LOCATION_MAIN;
  if (IsProduct(node)) return Color.PRODUCT_MAIN;
}
