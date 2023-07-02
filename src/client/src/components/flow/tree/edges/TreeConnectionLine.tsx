import { MarkerType, ConnectionLineComponentProps, getMarkerEnd, getSmoothStepPath } from "react-flow-renderer";
import { GetAspectColor } from "assets";
import { AspectColorType } from "../../../../models";
import { memo } from "react";

/**
 * Component to give custom styling to the edge dragged from a Terminal in TreeView.
 * @param params
 * @returns a line from a Node's terminal.
 */
const TreeConnectionLine = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourceNode,
  sourcePosition,
  targetPosition,
}: ConnectionLineComponentProps) => {
  const color = GetAspectColor(sourceNode?.data, AspectColorType.Main);
  const markerEnd = getMarkerEnd(MarkerType.ArrowClosed, null);
  const smoothPath = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });

  return (
    <g>
      <path style={GetStyle(color)} d={smoothPath} markerEnd={markerEnd} />
    </g>
  );
};

function GetStyle(color: string) {
  return { fill: "none", stroke: color, strokeWidth: 1.5 };
}

export default memo(TreeConnectionLine);
