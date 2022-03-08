import { lockNode, setIsLockedNode } from "../../../../../redux/store/project/actions";
import { Node, Project } from "../../../../../models";
import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../helpers";

export const OnLockNode = (node: Node, project: Project, isLockedBy: string, dispatch: Dispatch) => {
  if (!IsUnsaved(node)) dispatch(lockNode(node.id, project.id, !node.isLocked, isLockedBy));
  else
    dispatch(
      setIsLockedNode({
        id: node.id,
        projectId: project.id,
        isLocked: !node.isLocked,
        isLockedStatusBy: isLockedBy,
        isLockedStatusDate: new Date().toISOString(),
      })
    );
};
