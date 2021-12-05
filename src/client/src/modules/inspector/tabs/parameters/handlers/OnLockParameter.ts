import { Dispatch } from "redux";
import { Attribute } from "../../../../../models";
import { IsNode, IsTransport, IsInterface, IsConnector, IsComposite, IsEdge } from "../../../helpers/IsType";
import { InspectorElement, InspectorParametersElement, InspectorTerminalsElement } from "../../../types";
import {
  setIsLockedCompositeAttribute,
  setIsLockedInterfaceAttribute,
  setIsLockedInterfaceTerminalAttribute,
  setIsLockedNodeAttribute,
  setIsLockedNodeTerminalAttribute,
  setIsLockedTransportAttribute,
  setIsLockedTransportTerminalAttribute,
} from "../../../../../redux/store/project/actions";

const OnLockParameter = (
  element: InspectorParametersElement,
  inspectorParentElement: InspectorElement,
  terminalParentElement: InspectorTerminalsElement,
  attribute: Attribute,
  isLocked: boolean,
  isLockedBy: string,
  dispatch: Dispatch<any>
) => {
  if (IsNode(element)) {
    dispatch(setIsLockedNodeAttribute(attribute, element.id, isLocked, isLockedBy));
  } else if (IsTransport(element) && IsEdge(inspectorParentElement)) {
    dispatch(setIsLockedTransportAttribute(attribute, inspectorParentElement, isLocked, isLockedBy));
  } else if (IsInterface(element) && IsEdge(inspectorParentElement)) {
    dispatch(setIsLockedInterfaceAttribute(attribute, inspectorParentElement, isLocked, isLockedBy));
  } else if (IsConnector(element) && IsNode(terminalParentElement)) {
    dispatch(setIsLockedNodeTerminalAttribute(attribute, element.id, terminalParentElement, isLocked, isLockedBy));
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsTransport(terminalParentElement)) {
    dispatch(setIsLockedTransportTerminalAttribute(attribute, element.id, inspectorParentElement, isLocked, isLockedBy));
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsInterface(terminalParentElement)) {
    dispatch(setIsLockedInterfaceTerminalAttribute(attribute, element.id, inspectorParentElement, isLocked, isLockedBy));
  } else if (IsComposite(element) && IsNode(inspectorParentElement)) {
    dispatch(setIsLockedCompositeAttribute(attribute, element.id, inspectorParentElement, isLocked, isLockedBy));
  }
};

export default OnLockParameter;
