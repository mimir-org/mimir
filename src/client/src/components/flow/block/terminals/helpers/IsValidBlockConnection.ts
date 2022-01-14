import { Connection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text";
import { IsOffPage } from "../../../../../helpers";
import { Connector, Node } from "../../../../../models";
import { setValidation } from "../../../../../redux/store/validation/validationSlice";

/**
 * Function to check if a connection/edge in BlockView is valid.
 * @param conn
 * @param nodes
 * @param dispatch
 * @returns a boolean value.
 */
const IsValidBlockConnection = (conn: Connection, nodes: Node[], dispatch: Dispatch) => {
  const sourceNode = nodes.find((x) => x.id === conn.source);
  const sourceTerminal = sourceNode.connectors.find((x) => x.id === conn.sourceHandle);

  const targetNode = nodes.find((x) => x.id === conn.target);
  const targetTerminal = targetNode?.connectors.find((x) => x.id === conn.targetHandle);

  const isValidNode = ValidateNode(sourceTerminal, targetTerminal);
  let isValidOffPage = true;

  if (IsOffPage(sourceNode) || IsOffPage(targetNode)) isValidOffPage = ValidateOffPageNode(sourceNode, targetNode);

  document.addEventListener("mouseup", () => onMouseUp(sourceTerminal, targetTerminal, isValidNode, isValidOffPage, dispatch), {
    once: true,
  });

  return isValidNode && isValidOffPage;
};

function ValidateOffPageNode(sourceNode: Node, targetNode: Node) {
  return IsOffPage(sourceNode) && IsOffPage(targetNode);
}

function ValidateNode(sourceTerminal: Connector, targetTerminal: Connector) {
  return sourceTerminal?.terminalTypeId === targetTerminal?.terminalTypeId;
}

const onMouseUp = (
  sourceTerminal: Connector,
  targetTerminal: Connector,
  validNode: boolean,
  validOffPageNode: boolean,
  dispatch: Dispatch
) => {
  if (sourceTerminal && targetTerminal && !validNode)
    dispatch(setValidation({ valid: false, message: TextResources.Validation_Terminals }));
  if (sourceTerminal && targetTerminal && !validOffPageNode)
    dispatch(setValidation({ valid: false, message: TextResources.Validation_OffPage }));

  return document.removeEventListener("mouseup", () =>
    onMouseUp(sourceTerminal, targetTerminal, validNode, validOffPageNode, dispatch)
  );
};

export default IsValidBlockConnection;
