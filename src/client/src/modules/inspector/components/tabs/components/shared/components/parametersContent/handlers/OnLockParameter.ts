import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../../../../../helpers";
import { EntityType } from "../../../../../../../../../models/enums/EntityType";
import { Attribute } from "../../../../../../../../../models";
import { InspectorElement } from "../../../../../../../types";
import { lockEntity, setIsLockedAttribute } from "../../../../../../../../../redux/store/project/actions";

export const OnLockParameter = (
  inspectorParentElement: InspectorElement,
  attribute: Attribute,
  isLocked: boolean,
  isLockedBy: string,
  dispatch: Dispatch
) => {
  if (IsUnsaved(inspectorParentElement)) {
    handleLockOffline(attribute, isLocked, isLockedBy, dispatch);
  } else {
    handleLockOnline(attribute, isLocked, dispatch);
  }
};

const handleLockOnline = (attribute: Attribute, isLocked: boolean, dispatch: Dispatch) => {
  dispatch(lockEntity(attribute.id, isLocked, EntityType.Attribute));
};

const handleLockOffline = (attribute: Attribute, isLocked: boolean, isLockedBy: string, dispatch: Dispatch) => {
  dispatch(
    setIsLockedAttribute({
      id: attribute.id,
      isLocked: isLocked,
      isLockedStatusBy: isLockedBy,
      isLockedStatusDate: new Date().toISOString(),
      type: EntityType.Attribute,
    })
  );
};
