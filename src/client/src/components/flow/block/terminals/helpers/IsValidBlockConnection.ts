import { Connection } from "react-flow-renderer";
import { TextResources } from "../../../../../assets/text";
import { IsOffPage } from "../../../../../helpers";
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
  const isValidOffPageType = IsOffPage(sourceNode) && IsOffPage(targetNode);

  document.addEventListener(
    "mouseup",
    () => onMouseUp(sourceTerminal, targetTerminal, isValidType, isValidOffPageType, dispatch),
    { once: true }
  );

  return isValidType && isValidOffPageType;
};

export default IsValidBlockConnection;

const onMouseUp = (
  sourceTerminal: Connector,
  targetTerminal: Connector,
  isValidType: boolean,
  isValidOffPageType: boolean,
  dispatch: any
) => {
  if (sourceTerminal && targetTerminal && !isValidType) dispatch(setValidation(false, TextResources.Validation_Terminals));
  if (sourceTerminal && targetTerminal && !isValidOffPageType) dispatch(setValidation(false, TextResources.Validation_OffPage));

  return document.removeEventListener("mouseup", () =>
    onMouseUp(sourceTerminal, targetTerminal, isValidType, isValidOffPageType, dispatch)
  );
};
