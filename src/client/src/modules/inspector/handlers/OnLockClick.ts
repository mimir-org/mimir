import { Project } from "../../../models";
import { lockUnlockEdge, lockUnlockNode } from "../../../redux/store/project/actions";
import { IsNode, IsEdge } from "../helpers/IsType";
import { InspectorElement } from "../types";

const OnLockClick = (element: InspectorElement, project: Project, isLocked: boolean, isLockedBy: string, dispatch: any) => {
  if (IsNode(element)) dispatch(lockUnlockNode(element.id, project.id, isLocked, isLockedBy));
  if (IsEdge(element)) dispatch(lockUnlockEdge(element.id, project.id, isLocked, isLockedBy));
};

export default OnLockClick;
