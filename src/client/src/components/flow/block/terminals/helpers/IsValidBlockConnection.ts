import { Connection } from "react-flow-renderer";
import { TextResources } from "../../../../../assets/text";
import { Node } from "../../../../../models";
import { setValidation } from "../../../../../redux/store/validation/actions";

/**
 * Function to check if a connection/edge in BlockView is valid.
 * @param conn
 * @param nodes
 * @param dispatch
 * @returns a boolean value.
 */
const IsValidBlockConnection = (conn: Connection, nodes: Node[], dispatch: any) => {
  const sourceNode = nodes.find((x) => x.id === conn.source);
  const sourceTerminal = sourceNode.connectors.find((x) => x.id === conn.sourceHandle);

  const targetNode = nodes.find((x) => x.id === conn.target);
  const targetTerminal = targetNode?.connectors.find((x) => x.id === conn.targetHandle);

  console.log({ conn });
  console.log({ sourceNode });
  console.log({ targetNode });
  console.log({ sourceTerminal });
  console.log({ targetTerminal });
  console.log(sourceTerminal?.terminalTypeId);
  console.log(targetTerminal?.terminalTypeId);

  const isValidType = sourceTerminal?.terminalTypeId === targetTerminal?.terminalTypeId;
  if (!isValidType) dispatch(setValidation(false, TextResources.Validation_Terminals));

  return isValidType;
};

export default IsValidBlockConnection;
