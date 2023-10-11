import { EntityType, LockCm } from "lib";
import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../helpers";
import { InspectorElement } from "../../../types";
import { AspectObject } from "../../../../../lib/classes/AspectObject";
import { Connection } from "../../../../../lib/classes/Connection";

export const OnLockClick = (
  element: InspectorElement,
  isLocked: boolean,
  isLockedBy: string,
  setOnLock: (onLocked: boolean) => void,
  dispatch: Dispatch
) => {
  if (!IsUnsaved(element)) handleLockOnline(element, isLocked, dispatch);
  else handleLockOffline(element, isLocked, isLockedBy, dispatch);
  setOnLock(true);
};

const handleLockOnline = (element: InspectorElement, isLocked: boolean, dispatch: Dispatch) => {
  // TODO: Handle this
  // dispatch(lockEntity(element.id, element.project, isLocked, element instanceof AspectObject ? EntityType.AspectObject : EntityType.Connection));
};

const handleLockOffline = (element: InspectorElement, isLocked: boolean, isLockedBy: string, dispatch: Dispatch) => {
  const lockObj: LockCm = {
    id: element.id,
    projectId: "",
    isLocked,
    isLockedStatusBy: isLockedBy,
    isLockedStatusDate: new Date(),
    type: element instanceof AspectObject ? EntityType.AspectObject : EntityType.Connection,
  };

  if (element instanceof AspectObject) {
    // TODO: Handle this
    // dispatch(setLockedNode(lockObj));
  }
  if (element instanceof Connection) {
    // dispatch(setLockedEdge(lockObj));
  }
};
