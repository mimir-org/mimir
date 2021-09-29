import { Dispatch } from "redux";
import { Attribute, Node } from "../../../../../models";
import { setIsLockedAttribute } from "../../../../../redux/store/project/actions";

const OnLockParameter = (
  node: Node,
  attribute: Attribute,
  isLocked: boolean,
  dispatch: Dispatch<any>
) => {
  if (!node.isLocked)
    dispatch(setIsLockedAttribute(attribute, node.id, isLocked));
};

export default OnLockParameter;
