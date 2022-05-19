import { EdgeProps, getBezierPath } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors/Color";
import { IsFunction, IsLocation, IsProduct } from "../../../../../helpers/Aspects";
import { Node } from "../../../../../models";
import { GetTreeEdgeStyle } from "../helpers/GetTreeEdgeStyle";

/**
 * Component for a RelationEdge. The color of the RelationEdge is a combination of the sourceNode and targetNode's AspectColor.
 * @param params
 * @returns a hasLocation or fullfilledBy edge in TreeView.
 */
export const TreeRelationEdge = ({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const visible = !data?.edge?.hidden;
  const sourceColor = GetRelationColor(data.source);
  const targetColor = GetRelationColor(data.target);

  // Adjust to match connector
  targetX += 8;
  sourceX -= 8;

  const bezierPath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return (
    <>
      <path style={GetTreeEdgeStyle(sourceColor, visible)} className="path-treeRelationSourceEdge" d={bezierPath} />
      <path
        style={GetTreeEdgeStyle(targetColor, visible)}
        strokeDasharray="5,10"
        strokeLinecap="square"
        className="path-treeRelationTargetEdge"
        d={bezierPath}
      />
    </>
  );
};

function GetRelationColor(node: Node) {
  if (IsFunction(node)) return Color.SUNGLOW;
  if (IsLocation(node)) return Color.MAGENTA;
  if (IsProduct(node)) return Color.ELECTRIC_BLUE;
}
