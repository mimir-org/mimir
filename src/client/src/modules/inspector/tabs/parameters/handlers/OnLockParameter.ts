import { Dispatch } from "redux";
import { Attribute } from "../../../../../models";
import { setIsLockedNodeAttribute, setIsLockedTerminalAttribute } from "../../../../../redux/store/project/actions";
import { IsNode, IsTransport, IsInterface, IsConnector, IsComposite } from "../../../helpers/IsType";
import { InspectorParametersElement } from "../../../types";

const OnLockParameter = (
  element: InspectorParametersElement,
  attribute: Attribute,
  isLocked: boolean,
  isTopElementLocked: boolean,
  dispatch: Dispatch<any>
) => {
  if (isTopElementLocked) return;

  if (IsNode(element)) {
    dispatch(setIsLockedNodeAttribute(attribute, element.id, isLocked));
  } else if (IsTransport(element)) {
    //TODO: Handle Edge case
  } else if (IsInterface(element)) {
    //TODO: Handle Edge case
  } else if (IsConnector(element)) {
    dispatch(setIsLockedTerminalAttribute(attribute, element.id, isLocked));
  } else if (IsComposite(element)) {
    //TODO: Handle Edge case
  }
};

export default OnLockParameter;
