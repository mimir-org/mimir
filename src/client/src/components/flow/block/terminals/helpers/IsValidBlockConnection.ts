import { Connection } from "react-flow-renderer";
import { TextResources } from "../../../../../assets/text";
import { Connector, Node } from "../../../../../models";
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

  const isValidType = sourceTerminal?.terminalTypeId === targetTerminal?.terminalTypeId;

  document.addEventListener("mouseup", () => onMouseUp(sourceTerminal, targetTerminal, isValidType, dispatch), {
    once: true,
  });

  return isValidType;
};

export default IsValidBlockConnection;

const onMouseUp = (sourceTerminal: Connector, targetTerminal: Connector, isValidType: boolean, dispatch: any) => {
  if (sourceTerminal && targetTerminal && !isValidType) dispatch(setValidation(false, TextResources.Validation_Terminals));
  return document.removeEventListener("mouseup", () => onMouseUp(sourceTerminal, targetTerminal, isValidType, dispatch));
};
