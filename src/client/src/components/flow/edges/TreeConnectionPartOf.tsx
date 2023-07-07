import { Color } from "assets/color/Color";
import { Connection } from "lib";
import { memo } from "react";
import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
/**
 * Component for PartOfEdges in TreeView.
 * @param params
 * @returns an edge between nodes of the same Aspect.
 */
const TreeConnectionPartOf = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps<Connection>) => {
  const style = () => {
    return {
      stroke: data.aspectColor.mainColor,
      strokeWidth: "2px",
      opacity: data.hidden ? 0 : 1,
      transition: "opacity 250ms",
    };
  };

  const edgePathSmoothStep = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return <path id={id} style={style()} className="path-treePartOfEdge" d={edgePathSmoothStep} />;
};

export default memo(TreeConnectionPartOf);
