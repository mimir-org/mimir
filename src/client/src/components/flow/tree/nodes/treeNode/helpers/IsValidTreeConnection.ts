import { Connection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { IsFamily } from "../../../../../../helpers/Family";
import { GetMimirNodes } from "../../../../../../helpers/Selected";
import { Node } from "../../../../../../models";
import { setValidation } from "../../../../../../redux/store/validation/validationSlice";

/**
 * Function to check if a connection/edge in TreeView is valid.
 * @param node
 * @param conn
 * @param dispatch
 * @returns a boolean value.
 */
export const IsValidTreeConnection = (node: Node, conn: Connection, dispatch: Dispatch) => {
  const nodes = GetMimirNodes();
  const parentNode = nodes.find((x) => x.id === conn.source);
  const isValidAspect = IsFamily(node, parentNode);

  document.addEventListener("mouseup", () => onMouseUp(isValidAspect, dispatch), { once: true });

  return isValidAspect;
};

const onMouseUp = (isValidAspect: boolean, dispatch: Dispatch) => {
  if (!isValidAspect) dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_ASPECT }));
  return document.removeEventListener("mouseup", () => onMouseUp(isValidAspect, dispatch));
};
