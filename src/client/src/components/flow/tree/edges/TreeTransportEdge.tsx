import { Connector, ConnectorTerminal } from "lib";
import { memo } from "react";
import { EdgeProps, getSmoothStepPath } from "react-flow-renderer";

/**
 * Component for TransportEdges in TreeView.
 * @param params
 * @returns a horizontal transport edge between Product/Function nodes.
 */
const TreeTransportEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: EdgeProps) => {
  const sourceTerminal = data.source.connectors?.find((x: Connector) => x.id === data.edge.fromConnector.id) as ConnectorTerminal;

  const style = () => {
    return {
      stroke: sourceTerminal?.color,
      strokeWidth: "2px",
      opacity: data.edge.hidden ? 0 : 1,
      transition: "opacity 250ms",
    };
  };

  // Adjust to match connector
  targetX -= 6;

  const smoothStep = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  return <path id={id} style={style()} className="path-treeTransportEdge" d={smoothStep} />;
};

export default memo(TreeTransportEdge);
