import { ArrowHeadType, getMarkerEnd } from "react-flow-renderer";
import { Color } from "../../../../compLibrary";
import { Connector } from "../../../../models";
import { GetTerminalColor } from "../../block/terminals/helpers";

/**
 * Component to give custom styling to the edge dragged from a Terminal in TreeView.
 * @param param0
 * @returns a line from a Node's terminal.
 */
const TreeConnectionLine = ({ sourceX, sourceY, targetX, targetY, connectionLineType, sourceHandle, sourceNode }) => {
  const connector = sourceNode.data?.connectors.find((conn: Connector) => conn.id === sourceHandle.id) as Connector;
  console.log({ connector });
  const color = Color.FunctionMain;
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);

  return (
    <g>
      <path
        style={GetStyle(color)}
        className="animated"
        d={`M${sourceX},${sourceY} C ${sourceX} ${targetY + 100} ${sourceX} ${targetY + 100} ${targetX},${targetY}`}
        markerEnd={markerEnd}
      />
    </g>
  );
};

function GetStyle(color: string) {
  return {
    fill: "none",
    stroke: color,
    strokeWidth: 2,
  };
}

export default TreeConnectionLine;
