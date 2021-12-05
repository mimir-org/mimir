import { Project } from "../../../models";
import { setIsLockedNode } from "../../../redux/store/project/actions";
import { IsNode, IsEdge } from "../helpers/IsType";
import { InspectorElement } from "../types";

const OnLockClick = (element: InspectorElement, project: Project, isLocked: boolean, dispatch: any) => {
  if (IsNode(element)) dispatch(setIsLockedNode(element, project, isLocked));
  if (IsEdge(element)) {
    //TODO: Implement Edge locking
  }
};

export default OnLockClick;