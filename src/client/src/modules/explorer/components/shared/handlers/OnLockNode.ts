import { lockEntity, setIsLockedNode } from "../../../../../redux/store/project/actions";
import { Node } from "../../../../../models";
import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../helpers";
import { EntityType } from "../../../../../models/enums/EntityType";

export const OnLockNode = (node: Node, isLockedBy: string, dispatch: Dispatch) => {
  if (!IsUnsaved(node)) dispatch(lockEntity(node.id, !node.isLocked, EntityType.Node));
  else
    dispatch(
      setIsLockedNode({
        id: node.id,
        isLocked: !node.isLocked,
        isLockedStatusBy: isLockedBy,
        isLockedStatusDate: new Date().toISOString(),
        type: EntityType.Node,
      })
    );
};
