import { lockNode } from "../../../redux/store/project/actions";
import { Node, Project } from "../../../models";
import { Dispatch } from "redux";

const OnLockNode = (node: Node, project: Project, isLockedBy: string, dispatch: Dispatch) => {
  dispatch(lockNode(node.id, project.id, !node.isLocked, isLockedBy));
};

export default OnLockNode;
