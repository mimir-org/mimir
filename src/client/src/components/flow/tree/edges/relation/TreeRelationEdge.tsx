import { EdgeProps, getBezierPath } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers";
import { Node } from "../../../../../models";
import { GetTreeEdgeStyle } from "../helpers/GetTreeEdgeStyle";

/**
 * Component for a RelationEdge. The color of the RelationEdge is a combination of the sourceNode and targetNode's AspectColor.
 * @param params
 * @returns a hasLocation or fullfilledBy edge in TreeView.
 */
export const TreeRelationEdge = ({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const visible = !data?.edge?.isHidden;
  const sourceColor = GetRelationColor(data.source);
  const targetColor = GetRelationColor(data.target);

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
      <path style={GetTreeEdgeStyle(sourceColor, visible)} className="path-treeRelationSourceEdge" d={bezierPath} />
      <path
        style={GetTreeEdgeStyle(targetColor, visible)}
        strokeDasharray="5,10"
        strokeLinecap="square"
        className="path-treeRelationTargetEdge"
        d={bezierPath}
        markerEnd="url(#arrow)"
      />
    </>
  );
};

function GetRelationColor(node: Node) {
  if (IsFunction(node)) return Color.FUNCTION_SELECTED;
  if (IsLocation(node)) return Color.LOCATION_MAIN;
  if (IsProduct(node)) return Color.PRODUCT_MAIN;
}
