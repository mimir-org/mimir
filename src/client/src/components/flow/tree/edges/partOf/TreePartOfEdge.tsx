import { memo } from "react";
import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
import { GetAspectColor } from "../../../../../helpers";
import { AspectColorType } from "../../../../../models";
import { GetTreeEdgeStyle } from "../helpers/GetTreeEdgeStyle";

/**
 * Component for PartOfEdges in TreeView.
 * @param params
 * @returns a vertical edge between nodes of the same Aspect.
 */
const TreePartOfEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const color = GetAspectColor(data.edge.fromNode, AspectColorType.Main);
  const style = GetTreeEdgeStyle(color, !data.edge.hidden);
  const edgePathSmoothStep = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return <path id={id} style={style} className="path-treePartOfEdge" d={edgePathSmoothStep} />;
};

export default memo(TreePartOfEdge);
