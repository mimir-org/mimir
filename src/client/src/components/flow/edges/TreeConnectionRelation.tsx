import { Connection } from "lib";
import { EdgeProps, getBezierPath } from "react-flow-renderer";
import { memo } from "react";

/**
 * Component for a RelationEdge. The color of the RelationEdge is a combination of the sourceNode and targetNode's AspectColor.
 * @param params
 * @returns a hasLocation or fullfilledBy edge in TreeView.
 */
const TreeConnectionRelation = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<Connection>) => {
  const sourceStyle = () => {
    return {
      stroke: data.aspectColor.fromColor,
      strokeWidth: "2px",
      opacity: data.hidden ? 0 : 1,
      transition: "opacity 250ms",
    };
  };

  const targetStyle = () => {
    return {
      stroke: data.aspectColor.toColor,
      strokeWidth: "2px",
      opacity: data.hidden ? 0 : 1,
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

export default memo(TreeConnectionRelation);
