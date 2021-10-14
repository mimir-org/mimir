import { Dispatch } from "redux";
import { Attribute } from "../../../../../models";
import {
  setIsLockedCompositeAttribute,
  setIsLockedInterfaceAttribute,
  setIsLockedNodeAttribute,
  setIsLockedTerminalAttribute,
  setIsLockedTransportAttribute,
} from "../../../../../redux/store/project/actions";
import { IsNode, IsTransport, IsInterface, IsConnector, IsComposite } from "../../../helpers/IsType";
import { InspectorParametersElement } from "../../../types";

const OnLockParameter = (
  element: InspectorParametersElement,
  attribute: Attribute,
  isLocked: boolean,
  isTopElementLocked: boolean,
  dispatch: Dispatch<any>
) => {
  console.log(element);
  console.log(isTopElementLocked);
  console.log(IsTransport(element));
  if (isTopElementLocked) return;

  if (IsNode(element)) {
    dispatch(setIsLockedNodeAttribute(attribute, element.id, isLocked));
  } else if (IsTransport(element)) {
    dispatch(setIsLockedTransportAttribute(attribute, element.id, isLocked));
  } else if (IsInterface(element)) {
    dispatch(setIsLockedInterfaceAttribute(attribute, element.id, isLocked));
  } else if (IsConnector(element)) {
    dispatch(setIsLockedTerminalAttribute(attribute, element.id, isLocked));
  } else if (IsComposite(element)) {
    dispatch(setIsLockedCompositeAttribute(attribute, element.id, isLocked));
  }
};

export default OnLockParameter;
