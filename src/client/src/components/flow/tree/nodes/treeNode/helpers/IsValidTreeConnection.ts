import { Connection } from "react-flow-renderer";
import { Dispatch } from "redux";
import { TextResources } from "../../../../../../assets/text";
import { IsFamily } from "../../../../../../helpers";
import { Node } from "../../../../../../models";
import { setValidation } from "../../../../../../redux/store/validation/validationSlice";

/**
 * Function to check if a connection/edge in TreeView is valid.
 * @param node
 * @param conn
 * @param nodes
 * @param dispatch
 * @returns a boolean value.
 */
export const IsValidTreeConnection = (node: Node, conn: Connection, nodes: Node[], dispatch: Dispatch) => {
  const parentNode = nodes.find((x) => x.id === conn.source);
  const isValidAspect = IsFamily(node, parentNode);

  document.addEventListener("mouseup", () => onMouseUp(isValidAspect, dispatch), {
    once: true,
  });

  return isValidAspect;
};

const onMouseUp = (isValidAspect: boolean, dispatch: Dispatch) => {
  if (!isValidAspect) dispatch(setValidation({ valid: false, message: TextResources.Validation_Aspect }));
  return document.removeEventListener("mouseup", () => onMouseUp(isValidAspect, dispatch));
};
