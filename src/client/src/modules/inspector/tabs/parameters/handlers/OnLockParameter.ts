import { Dispatch } from "redux";
import { Attribute, Project } from "../../../../../models";
import { lockAttribute } from "../../../../../redux/store/project/actions";

const OnLockParameter = (
  project: Project,
  attribute: Attribute,
  isLocked: boolean,
  isLockedBy: string,
  dispatch: Dispatch<any>
) => {
  dispatch(lockAttribute(attribute.id, project.id, isLocked, isLockedBy));
};

export default OnLockParameter;
