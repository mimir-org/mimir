import "./PartEdge.scss";
import { getSmoothStepPath } from "react-flow-renderer";
import { GetAspectColor } from "../../../../helpers";
import { AspectColorType } from "../../../../models";
import { GetEdgeStyle } from "./helpers";

export default function PartEdgeType({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) {
  const edgePathSmoothStep = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const color = GetAspectColor(data.edge.fromNode, AspectColorType.Main);
  const style = GetEdgeStyle(color, !data.edge.isHidden);

  return <path id={id} style={style} className="react-flow__edge-path" d={edgePathSmoothStep} markerEnd={null} />;
}
