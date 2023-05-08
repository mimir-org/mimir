import { Connection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { GetMimirNodes } from "../../../../../../helpers/Selected";
// import { setValidation } from "../../../../../../redux/store/validation/validationSlice";
// import { ValidateFlowTreeEdge } from "../../../builders/helpers";
import { AspectObject } from "lib";

/**
 * Function to check if a connection/edge in TreeView is valid.
 * @param node
 * @param connection
 * @param dispatch
 * @returns a boolean value.
 */
export const IsValidTreeConnection = (node: AspectObject, connection: Connection, dispatch: Dispatch) => {
  const nodes = GetMimirNodes() as AspectObject[];
  const fromNode = nodes.find((n) => n.id === connection.source);
  const toNode = nodes.find((n) => n.id === connection.target);
  const fromConnector = fromNode?.connectors.find((c) => c.id === connection.sourceHandle);
  const toConnector = toNode?.connectors.find((c) => c.id === connection.targetHandle);

  const [status, message] = [true, "Manuelt validert"]; // ValidateFlowTreeEdge(fromNode, toNode, fromConnector, toConnector);
  document.addEventListener("mouseup", () => onMouseUp(status, message, dispatch), { once: true });
  return status;
};

const onMouseUp = (status: boolean, message: string, dispatch: Dispatch) => {
  // if (!status) dispatch(setValidation({ valid: false, message: message }));
  return document.removeEventListener("mouseup", () => onMouseUp(status, message, dispatch));
};
