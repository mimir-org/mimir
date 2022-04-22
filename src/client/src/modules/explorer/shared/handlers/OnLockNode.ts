import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../helpers";
import { Node } from "../../../../models";
import { EntityType } from "../../../../models/enums/EntityType";
import { lockEntity, setLockedNode } from "../../../../redux/store/project/actions";

export const OnLockNode = (node: Node, isLockedBy: string, setLockingNode: (node: Node) => void, dispatch: Dispatch) => {
  setLockingNode(node);

  if (!IsUnsaved(node)) dispatch(lockEntity(node.id, !node.isLocked, EntityType.Node));
  else
    dispatch(
      setLockedNode({
        id: node.id,
        isLocked: !node.isLocked,
        isLockedStatusBy: isLockedBy,
        isLockedStatusDate: new Date().toISOString(),
        type: EntityType.Node,
      })
    );
};
