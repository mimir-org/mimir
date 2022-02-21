import { ArrowHeadType, ConnectionLineComponentProps, getMarkerEnd } from "react-flow-renderer";
import { Connector } from "../../../../models";
import { GetTerminalColor } from "../../helpers";

/**
 * Component to give custom styling to the edge dragged from a Terminal in BlockView.
 * @param params
 * @returns a line from a Node's terminal.
 */
const BlockConnectionLine = ({ sourceX, sourceY, targetX, targetY, sourceHandle, sourceNode }: ConnectionLineComponentProps) => {
  const connector = sourceNode.data?.connectors?.find((conn: Connector) => conn.id === sourceHandle?.id) as Connector;
  const color = GetTerminalColor(connector);
  const markerEnd = getMarkerEnd(ArrowHeadType.ArrowClosed, null);

  return (
    <g>
      <path
        style={GetStyle(color)}
        className="animated"
        d={`M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`}
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

export default BlockConnectionLine;
