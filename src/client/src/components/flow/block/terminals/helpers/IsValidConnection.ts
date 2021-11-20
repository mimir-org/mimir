import { Connection } from "react-flow-renderer";
import { Connector, Node } from "../../../../../models";

/**
 * Function to check if a connection/edge is valid.
 * @param conn
 * @param nodes
 * @param terminals
 * @returns a boolean value.
 */
const IsValidConnection = (conn: Connection, nodes: Node[], terminals: Connector[]) => {
  const targetNode = nodes.find((x) => x.id === conn.target);
  const sourceTerminal = terminals.find((x) => x.id === conn.sourceHandle);
  const targetTerminal = targetNode?.connectors.find((x) => x.id === conn.targetHandle);

  return sourceTerminal?.terminalTypeId === targetTerminal?.terminalTypeId;
};

export default IsValidConnection;
