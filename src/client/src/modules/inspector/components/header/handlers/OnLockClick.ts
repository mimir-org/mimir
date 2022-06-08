import { EntityType } from "@mimirorg/modelbuilder-types";
import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../helpers";
import { LockCm } from "../../../../../models";
import { lockEntity, setLockedEdge, setLockedNode } from "../../../../../redux/store/project/actions";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { InspectorElement } from "../../../types";

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
  dispatch(lockEntity(element.id, element.projectId, isLocked, IsNode(element) ? EntityType.Node : EntityType.Edge));
};

const handleLockOffline = (element: InspectorElement, isLocked: boolean, isLockedBy: string, dispatch: Dispatch) => {
  const lockObj: LockCm = {
    id: element.id,
    projectId: "",
    isLocked,
    isLockedStatusBy: isLockedBy,
    isLockedStatusDate: new Date().toISOString(),
    type: IsNode(element) ? EntityType.Node : EntityType.Edge,
  };

  if (IsNode(element)) dispatch(setLockedNode(lockObj));
  if (IsEdge(element)) dispatch(setLockedEdge(lockObj));
};
