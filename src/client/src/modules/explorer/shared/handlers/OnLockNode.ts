import { lockNode, setIsLockedNode } from "./../../../../redux/store/project/actions";
import { Node, Project } from "./../../../../models";
import { Dispatch } from "redux";
import { IsUnsaved } from "./../../../../helpers";

export const OnLockNode = (node: Node, project: Project, isLockedStatusBy: string, dispatch: Dispatch) => {
  const id = node?.id;
  const projectId = project?.id;
  const isLocked = !node?.isLocked;

  if (!IsUnsaved(node)) dispatch(lockNode(id, projectId, isLocked, isLockedStatusBy));
  else dispatch(setIsLockedNode({ id, projectId, isLocked, isLockedStatusBy, isLockedStatusDate: new Date().toISOString() }));
};
