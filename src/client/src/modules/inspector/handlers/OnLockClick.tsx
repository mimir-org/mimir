import { Project, Node } from "../../../models";
import { lockUnlockNode } from "../../../redux/store/project/actions";

const OnLockClick = (
  node: Node,
  project: Project,
  isLocked: boolean,
  dispatch: any
) => {
  dispatch(lockUnlockNode(node, project, isLocked));
};

export default OnLockClick;
