import { Connection } from "react-flow-renderer";
import { TextResources } from "../../../../../assets/text";
import { Connector, Node } from "../../../../../models";
import { setValidation } from "../../../../../redux/store/validation/actions";

/**
 * Function to check if a connection/edge is valid.
 * @param conn
 * @param nodes
 * @param terminals
 * @param dispatch
 * @returns a boolean value.
 */
const IsValidConnection = (conn: Connection, nodes: Node[], terminals: Connector[], dispatch) => {
  const targetNode = nodes.find((x) => x.id === conn.target);
  const sourceTerminal = terminals.find((x) => x.id === conn.sourceHandle);
  const targetTerminal = targetNode?.connectors.find((x) => x.id === conn.targetHandle);

  const isValid = sourceTerminal?.terminalTypeId === targetTerminal?.terminalTypeId;
  if (!isValid) dispatch(setValidation(false, TextResources.Validation_Terminals));

  return isValid;
};

export default IsValidConnection;
