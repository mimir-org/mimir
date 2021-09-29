import { Project, Node } from "../../../models";
import { setIsLockedNode } from "../../../redux/store/project/actions";

const OnLockClick = (
  node: Node,
  project: Project,
  isLocked: boolean,
  dispatch: any
) => {
  dispatch(setIsLockedNode(node, project, isLocked));
};

export default OnLockClick;
