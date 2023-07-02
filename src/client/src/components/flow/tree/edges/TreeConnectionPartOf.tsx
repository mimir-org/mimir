import { memo } from "react";
import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
import { GetAspectColor } from "assets";
import { AspectColorType } from "../../../../models";

/**
 * Component for PartOfEdges in TreeView.
 * @param params
 * @returns an edge between nodes of the same Aspect.
 */
const TreeConnectionPartOf = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const style = () => {
    return {
      stroke: data.color,
      strokeWidth: "2px",
      opacity: data.hidden ? 0 : 1,
      transition: "opacity 250ms",
    };
  };

  const edgePathSmoothStep = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return <path id={id} style={style()} className="path-treePartOfEdge" d={edgePathSmoothStep} />;
};

export default memo(TreeConnectionPartOf);
