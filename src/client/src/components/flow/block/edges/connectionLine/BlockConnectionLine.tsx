import { ConnectionLineComponentProps } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors/Color";
import { Connector } from "../../../../../models";
import { GetTerminalColor } from "../../helpers";

/**
 * Component to give custom styling to the edge dragged from a Terminal in BlockView.
 * @param params
 * @returns a line from a Node's terminal.
 */
export const BlockConnectionLine = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourceHandle,
  sourceNode,
}: ConnectionLineComponentProps) => {
  const connector = sourceNode.data?.connectors?.find((conn: Connector) => conn.id === sourceHandle?.id) as Connector;
  const color = GetTerminalColor(connector);
  const arrowId = `arrow-${connector.id}`;

  return (
    <g>
      <marker id={arrowId} refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="20" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={Color.BLACK} />
      </marker>
      <path
        strokeDasharray="0.3,10"
        strokeLinecap="square"
        style={GetStyle(color)}
        d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
        markerEnd={`url(#${arrowId})`}
      />
    </g>
  );
};

function GetStyle(color: string) {
  return { fill: "none", stroke: color, strokeWidth: 2 };
}
