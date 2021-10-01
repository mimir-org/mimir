import { Dispatch } from "redux";
import { Attribute } from "../../../../../models";
import {
  setIsLockedNodeAttribute,
  setIsLockedTerminalAttribute,
} from "../../../../../redux/store/project/actions";

const OnLockParameter = (
  attribute: Attribute,
  isLocked: boolean,
  elementId: string,
  isNodeLocked: boolean,
  isElementNode: boolean,
  dispatch: Dispatch<any>
) => {
  if (isNodeLocked) return;

  if (isElementNode) {
    dispatch(setIsLockedNodeAttribute(attribute, elementId, isLocked));
  } else {
    dispatch(setIsLockedTerminalAttribute(attribute, elementId, isLocked));
  }
};

export default OnLockParameter;
