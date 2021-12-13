import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../helpers";
import { Attribute, Project } from "../../../../../models";
import {
  lockAttribute,
  setIsLockedCompositeAttribute,
  setIsLockedInterfaceAttribute,
  setIsLockedNodeAttribute,
  setIsLockedNodeTerminalAttribute,
  setIsLockedTransportAttribute,
  setIsLockedTransportTerminalAttribute,
} from "../../../../../redux/store/project/actions";
import { IsNode, IsTransport, IsEdge, IsInterface, IsConnector, IsComposite } from "../../../helpers/IsType";
import { InspectorParametersElement, InspectorElement, InspectorTerminalsElement } from "../../../types";

const OnLockParameter = (
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
  const lockObj = {
    id: attribute.id,
    projectId: project.id,
    isLocked,
    isLockedStatusBy: isLockedBy,
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
  } else if (IsComposite(element) && IsNode(inspectorParentElement)) {
    dispatch(setIsLockedCompositeAttribute({ ...lockObj, nodeId: terminalParentElement.id, compositeId: element.id }));
  }
};

export default OnLockParameter;
