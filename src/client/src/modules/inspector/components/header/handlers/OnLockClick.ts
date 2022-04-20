import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../helpers";
import { LockCm } from "../../../../../models";
import { lockEntity, setIsLockedEdge, setIsLockedNode } from "../../../../../redux/store/project/actions";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";
import { EntityType } from "../../../../../models/enums/EntityType";

export const OnLockClick = (element: InspectorElement, isLocked: boolean, isLockedBy: string, dispatch: Dispatch) => {
  if (!IsUnsaved(element)) handleLockOnline(element, isLocked, dispatch);
  else handleLockOffline(element, isLocked, isLockedBy, dispatch);
};

const handleLockOnline = (element: InspectorElement, isLocked: boolean, dispatch: Dispatch) => {
  dispatch(lockEntity(element.id, isLocked, IsNode(element) ? EntityType.Node : EntityType.Edge));
};

const handleLockOffline = (element: InspectorElement, isLocked: boolean, isLockedBy: string, dispatch: Dispatch) => {
  const lockObj: LockCm = {
    id: element.id,
    isLocked: isLocked,
    isLockedStatusBy: isLockedBy,
    isLockedStatusDate: new Date().toISOString(),
    type: IsNode(element) ? EntityType.Node : EntityType.Edge,
  };

  if (IsNode(element)) dispatch(setIsLockedNode(lockObj));
  if (IsEdge(element)) dispatch(setIsLockedEdge(lockObj));
};
