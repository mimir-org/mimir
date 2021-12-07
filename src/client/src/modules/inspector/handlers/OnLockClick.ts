import { Project } from "../../../models";
import { setIsLockedEdge, setIsLockedNode } from "../../../redux/store/project/actions";
import { IsNode, IsEdge } from "../helpers/IsType";
import { InspectorElement } from "../types";

const OnLockClick = (element: InspectorElement, project: Project, isLocked: boolean, isLockedBy: string, dispatch: any) => {
  if (IsNode(element)) dispatch(setIsLockedNode(element, project, isLocked, isLockedBy));
  if (IsEdge(element)) dispatch(setIsLockedEdge(element, isLocked, isLockedBy));
};

export default OnLockClick;
