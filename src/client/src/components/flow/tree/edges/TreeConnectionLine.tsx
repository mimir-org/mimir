import { ArrowHeadType, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { GetAspectColor } from "../../../../helpers";
import { AspectColorType } from "../../../../models";

/**
 * Component to give custom styling to the edge dragged from a Terminal in TreeView.
 * @param param0
 * @returns a line from a Node's terminal.
 */
const TreeConnectionLine = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  connectionLineType,
  sourceHandle,
  sourceNode,
  sourcePosition,
  targetPosition,
}) => {
  const color = GetAspectColor(sourceNode?.data, AspectColorType.Main);
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);
  const smoothPath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <g>
      <path style={GetStyle(color)} d={smoothPath} markerEnd={markerEnd} />
    </g>
  );
};

function GetStyle(color: string) {
  return {
    fill: "none",
    stroke: color,
    strokeWidth: 1.5,
  };
}

export default TreeConnectionLine;
