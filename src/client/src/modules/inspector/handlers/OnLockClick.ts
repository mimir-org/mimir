import { Dispatch } from "redux";
import { IsUnsaved } from "../../../helpers";
import { LockNodeAm, Project } from "../../../models";
import { lockEdge, lockNode, setIsLockedEdge, setIsLockedNode } from "../../../redux/store/project/actions";
import { IsEdge, IsNode } from "../helpers/IsType";
import { InspectorElement } from "../types";

const OnLockClick = (element: InspectorElement, project: Project, isLocked: boolean, isLockedBy: string, dispatch: Dispatch) => {
  if (!IsUnsaved(element)) handleLockOnline(element, project, isLocked, isLockedBy, dispatch);
  else handleLockOffline(element, project, isLocked, isLockedBy, dispatch);
};

const handleLockOnline = (
  element: InspectorElement,
  project: Project,
  isLocked: boolean,
  isLockedBy: string,
  dispatch: Dispatch
) => {
  if (IsNode(element)) dispatch(lockNode(element.id, project.id, isLocked, isLockedBy));
  if (IsEdge(element)) dispatch(lockEdge(element.id, project.id, isLocked, isLockedBy));
};

const handleLockOffline = (
  element: InspectorElement,
  project: Project,
  isLocked: boolean,
  isLockedBy: string,
  dispatch: Dispatch
) => {
  const lockObj: LockNodeAm = {
    id: element.id,
    projectId: project.id,
    isLocked,
    isLockedStatusBy: isLockedBy,
    isLockedStatusDate: new Date().toISOString(),
  };

  if (IsNode(element)) dispatch(setIsLockedNode(lockObj));
  if (IsEdge(element)) dispatch(setIsLockedEdge(lockObj));
};

export default OnLockClick;
