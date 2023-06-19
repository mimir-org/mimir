import { Aspect, AspectObject } from "lib";
import { EdgeProps, getBezierPath } from "react-flow-renderer";
import { Color } from "../../../../assets/color/Color";
import { memo } from "react";

/**
 * Component for a RelationEdge. The color of the RelationEdge is a combination of the sourceNode and targetNode's AspectColor.
 * @param params
 * @returns a hasLocation or fullfilledBy edge in TreeView.
 */
const TreeRelationEdge = ({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const relationColor = (node: AspectObject): string => {
    if (node.aspect === Aspect.Function) return Color.SUNGLOW;
    if (node.aspect === Aspect.Location) return Color.MAGENTA;
    if (node.aspect === Aspect.Product) return Color.ELECTRIC_BLUE;
  };

  const sourceStyle = () => {
    return {
      stroke: relationColor(data.source),
      strokeWidth: "2px",
      opacity: data.edge.hidden ? 0 : 1,
      transition: "opacity 250ms",
    };
  };

  const targetStyle = () => {
    return {
      stroke: relationColor(data.target),
      strokeWidth: "2px",
      opacity: data.edge.hidden ? 0 : 1,
      transition: "opacity 250ms",
    };
  };

  // Adjust to match connector
  targetX += 8;
  sourceX -= 8;

  const bezierPath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return (
    <>
      <path style={sourceStyle()} className="path-treeRelationSourceEdge" d={bezierPath} />
      <path
        style={targetStyle()}
        strokeDasharray="5,10"
        strokeLinecap="square"
        className="path-treeRelationTargetEdge"
        d={bezierPath}
      />
    </>
  );
};

export default memo(TreeRelationEdge);
