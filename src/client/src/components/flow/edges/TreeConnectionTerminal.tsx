import { Connection } from "lib";
import { memo } from "react";
import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";

/**
 * Component for TransportEdges in TreeView.
 * @param params
 * @returns a horizontal transport edge between Product/Function nodes.
 */
const TreeConnectionTerminal = ({
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
      stroke: data.aspectColor.terminalColor,
      strokeWidth: "2px",
      opacity: data.hidden ? 0 : 1,
      transition: "opacity 250ms",
    };
  };

  // Adjust to match connector
  targetX -= 6;

  const smoothStep = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  return <path id={id} style={style()} className="path-treeTransportEdge" d={smoothStep} />;
};

export default memo(TreeConnectionTerminal);
