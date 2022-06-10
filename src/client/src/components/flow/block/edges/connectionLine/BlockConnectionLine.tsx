import { Connector } from "@mimirorg/modelbuilder-types";
import { ConnectionLineComponentProps } from "react-flow-renderer";
import { Color } from "../../../../../assets/color/Color";
import { IsInputConnector } from "../../../helpers/Connectors";
import { GetTerminalColor } from "../../helpers";

/**
 * Component to give custom styling to the edge dragged from a Terminal in BlockView.
 * @param params
 * @returns a SVG element, a temporary line from a Node's terminal while dragging.
 */
export const BlockConnectionLine = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourceHandle,
  sourceNode,
}: ConnectionLineComponentProps) => {
  const connector = sourceNode.data?.connectors?.find((conn: Connector) => conn.id === sourceHandle.id) as Connector;
  const isTarget = IsInputConnector(connector);
  const arrowId = `arrow-${connector.id}`;

  // These paths define which way the connection line and the markerArrow arrow will point
  const sourcePath = `M${sourceX},${sourceY} C ${sourceX} ${targetY} ${sourceX} ${targetY} ${targetX},${targetY}`;
  const targetPath = `M${targetX},${targetY} C ${targetX} ${sourceY} ${targetX} ${sourceY} ${sourceX},${sourceY}`;

  // Custom arrow on the end of the connection line
  const markerArrow = (
    <marker id={arrowId} refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="20" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill={Color.BLACK} />
    </marker>
  );

  return (
    <g>
      {markerArrow}
      <path
        strokeDasharray="0.3,10"
        strokeLinecap="square"
        style={GetStyle(connector)}
        d={isTarget ? targetPath : sourcePath}
        markerEnd={`url(#${arrowId})`}
      />
    </g>
  );
};

function GetStyle(connector: Connector) {
  const color = GetTerminalColor(connector);
  return { fill: "none", stroke: color, strokeWidth: 2 };
}
