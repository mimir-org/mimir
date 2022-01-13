import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";
import { GetAspectColor } from "../../../../helpers";
import { AspectColorType } from "../../../../models";
import { GetEdgeStyle } from "../../helpers";

/**
 * Component for PartOfEdges in TreeView.
 * @param params
 * @returns a vertical edge between nodes of the same Aspect.
 */
const TreePartEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const color = GetAspectColor(data.edge.fromNode, AspectColorType.Main);
  const style = GetEdgeStyle(color, !data.edge.isHidden);

  const edgePathSmoothStep = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return <path id={id} style={style} className="path-partEdge" d={edgePathSmoothStep} markerEnd={null} />;
};

export default TreePartEdge;
