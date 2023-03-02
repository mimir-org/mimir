import { EdgeProps, getBezierPath } from "react-flow-renderer";
import { Color } from "../../../../../assets/color/Color";
import { GetTreeEdgeStyle } from "../helpers/GetTreeEdgeStyle";
import { MimirNode } from "../../../../../lib/classes/MimirNode";

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

function GetRelationColor(node: MimirNode) {
  if (node.isFunction()) return Color.SUNGLOW;
  if (node.isLocation()) return Color.MAGENTA;
  if (node.isProduct()) return Color.ELECTRIC_BLUE;
}
