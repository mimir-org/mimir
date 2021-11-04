import { Color } from "../../../../compLibrary";
import { Connector } from "../../../../models";
import { GetTerminalColor } from "../terminals/helpers";

/**
 * Component to give custom styling to the line dragged from a Terminal.
 * @param param0
 * @returns a line from a Node's terminal.
 */
const ConnectionLine = ({ sourceX, sourceY, targetX, targetY, connectionLineType, sourceHandle, sourceNode }) => {
  const connector = sourceNode.data?.connectors.find((conn: Connector) => conn.id === sourceHandle.id) as Connector;
  const color = GetTerminalColor(connector);

  return (
    <g>
      <path
        style={GetStyle(color)}
        className="animated"
        d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
      />
      <circle cx={targetX} cy={targetY} fill={Color.White} r={3} stroke={color} strokeWidth={1.5} />
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

export default ConnectionLine;
