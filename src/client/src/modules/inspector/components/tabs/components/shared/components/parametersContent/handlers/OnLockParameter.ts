import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../../../../../helpers";
import { Attribute, LockAttributeAm, Project } from "../../../../../../../../../models";
import { IsConnector, IsEdge, IsInterface, IsNode, IsSimple, IsTransport } from "../../../../../../../helpers/IsType";
import { InspectorElement, InspectorParametersElement, InspectorTerminalsElement } from "../../../../../../../types";
import {
  lockAttribute,
  setIsLockedInterfaceAttribute,
  setIsLockedNodeAttribute,
  setIsLockedNodeTerminalAttribute,
  setIsLockedSimpleAttribute,
  setIsLockedTransportAttribute,
  setIsLockedTransportTerminalAttribute,
} from "../../../../../../../../../redux/store/project/actions";

export const OnLockParameter = (
  element: InspectorParametersElement,
  inspectorParentElement: InspectorElement,
  terminalParentElement: InspectorTerminalsElement,
  elementIsLocked: boolean,
  project: Project,
  attribute: Attribute,
  isLocked: boolean,
  isLockedBy: string,
  dispatch: Dispatch
) => {
  if (!IsUnsaved(inspectorParentElement)) handleLockOnline(attribute, project, isLocked, isLockedBy, dispatch);
  else
    handleLockOffline(
      element,
      inspectorParentElement,
      terminalParentElement,
      elementIsLocked,
      project,
      attribute,
      isLocked,
      isLockedBy,
      dispatch
    );
};

const handleLockOnline = (attribute: Attribute, project: Project, isLocked: boolean, isLockedBy: string, dispatch: Dispatch) => {
  dispatch(lockAttribute(attribute.id, project.id, isLocked, isLockedBy));
};

const handleLockOffline = (
  element: InspectorParametersElement,
  inspectorParentElement: InspectorElement,
  terminalParentElement: InspectorTerminalsElement,
  elementIsLocked: boolean,
  project: Project,
  attribute: Attribute,
  isLocked: boolean,
  isLockedBy: string,
  dispatch: Dispatch
) => {
  const lockObj: LockAttributeAm = {
    id: attribute.id,
    projectId: project.id,
    isLocked,
    isLockedStatusBy: isLockedBy,
    isLockedStatusDate: new Date().toISOString(),
  };

  if (IsNode(element)) {
    dispatch(setIsLockedNodeAttribute({ ...lockObj, nodeId: element.id }));
  } else if (IsTransport(element) && IsEdge(inspectorParentElement)) {
    dispatch(setIsLockedTransportAttribute({ ...lockObj, edgeId: inspectorParentElement.id, transportId: element.id }));
  } else if (IsInterface(element) && IsEdge(inspectorParentElement)) {
    dispatch(setIsLockedInterfaceAttribute({ ...lockObj, edgeId: inspectorParentElement.id, interfaceId: element.id }));
  } else if (IsConnector(element) && IsNode(terminalParentElement)) {
    dispatch(setIsLockedNodeTerminalAttribute({ ...lockObj, nodeId: terminalParentElement.id, terminalId: element.id }));
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsTransport(terminalParentElement)) {
    dispatch(
      setIsLockedTransportTerminalAttribute({
        ...lockObj,
        edgeId: inspectorParentElement.id,
        transportId: terminalParentElement.id,
        terminalId: element.id,
      })
    );
  } else if (IsConnector(element) && IsEdge(inspectorParentElement) && IsInterface(terminalParentElement)) {
    dispatch(
      setIsLockedNodeTerminalAttribute({
        ...lockObj,
        edgeId: inspectorParentElement.id,
        interfaceId: terminalParentElement.id,
        terminalId: element.id,
      })
    );
  } else if (IsSimple(element) && IsNode(inspectorParentElement)) {
    dispatch(setIsLockedSimpleAttribute({ ...lockObj, nodeId: terminalParentElement.id, compositeId: element.id }));
  }
};
