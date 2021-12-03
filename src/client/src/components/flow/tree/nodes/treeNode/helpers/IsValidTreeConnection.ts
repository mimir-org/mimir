import { Connection } from "react-flow-renderer";
import { TextResources } from "../../../../../../assets/text";
import { IsFamily } from "../../../../../../helpers";
import { Node } from "../../../../../../models";
import { setValidation } from "../../../../../../redux/store/validation/actions";

/**
 * Function to check if a connection/edge in TreeView is valid.
 * @param node
 * @param conn
 * @param nodes
 * @param dispatch
 * @returns a boolean value.
 */
const IsValidTreeConnection = (node: Node, conn: Connection, nodes: Node[], dispatch: any) => {
  const parentNode = nodes.find((x) => x.id === conn.source);
  const isValidAspect = IsFamily(node, parentNode);

  document.addEventListener("mouseup", () => onMouseUp(isValidAspect, dispatch), {
    once: true,
  });

  return isValidAspect;
};

export default IsValidTreeConnection;

const onMouseUp = (isValidAspect: boolean, dispatch: any) => {
  if (!isValidAspect) dispatch(setValidation(false, TextResources.Validation_Aspect));
  return document.removeEventListener("mouseup", () => onMouseUp(isValidAspect, dispatch));
};
