import { Dispatch } from "redux";
import { IsUnsaved } from "../../../helpers";
import { Project } from "../../../models";
import { lockUnlockEdge, lockUnlockNode, setIsLockedEdge, setIsLockedNode } from "../../../redux/store/project/actions";
import { IsNode, IsEdge } from "../helpers/IsType";
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
  if (IsNode(element)) dispatch(lockUnlockNode(element.id, project.id, isLocked, isLockedBy));
  if (IsEdge(element)) dispatch(lockUnlockEdge(element.id, project.id, isLocked, isLockedBy));
};

const handleLockOffline = (
  element: InspectorElement,
  project: Project,
  isLocked: boolean,
  isLockedBy: string,
  dispatch: Dispatch
) => {
  const lockObj = { id: element.id, projectId: project.id, isLocked, isLockedStatusBy: isLockedBy };

  if (IsNode(element)) dispatch(setIsLockedNode(lockObj));
  if (IsEdge(element)) dispatch(setIsLockedEdge(lockObj));
};

export default OnLockClick;
