import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../../../../../helpers";
import { InspectorElement } from "../../../../../../../types";
import { lockEntity, setLockedAttribute } from "../../../../../../../../../redux/store/project/actions";
import { Attribute, EntityType } from "@mimirorg/modelbuilder-types";

export const OnLockParameter = (
  inspectorParentElement: InspectorElement,
  attribute: Attribute,
  projectId: string,
  isLocked: boolean,
  isLockedBy: string,
  setLockingAttribute: (attribute: Attribute) => void,
  dispatch: Dispatch
) => {
  if (IsUnsaved(inspectorParentElement)) {
    handleLockOffline(attribute, projectId, isLocked, isLockedBy, dispatch);
  } else {
    handleLockOnline(attribute, projectId, isLocked, dispatch);
  }
  setLockingAttribute(attribute);
};

const handleLockOnline = (attribute: Attribute, projectId: string, isLocked: boolean, dispatch: Dispatch) => {
  dispatch(lockEntity(attribute.id, projectId, isLocked, EntityType.Attribute));
};

const handleLockOffline = (
  attribute: Attribute,
  projectId: string,
  isLocked: boolean,
  isLockedBy: string,
  dispatch: Dispatch
) => {
  dispatch(
    setLockedAttribute({
      id: attribute.id,
      projectId: projectId,
      isLocked: isLocked,
      isLockedStatusBy: isLockedBy,
      isLockedStatusDate: new Date(), //.toISOString(),
      type: EntityType.Attribute,
    })
  );
};
