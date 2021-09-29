import { Dispatch } from "redux";
import { Attribute, Node } from "../../../../../models";
import { lockUnlockAttribute } from "../../../../../redux/store/project/actions";

const OnLockParameter = (
  node: Node,
  attribute: Attribute,
  isLocked: boolean,
  dispatch: Dispatch<any>
) => {
  if (!node.isLocked)
    dispatch(lockUnlockAttribute(attribute, node.id, isLocked));
};

export default OnLockParameter;
