import { lockEntity, setLockedNode } from "../../../../../redux/store/project/actions";
import { Dispatch } from "redux";
import { IsUnsaved } from "../../../../../helpers";
import { EntityType, Node } from "@mimirorg/modelbuilder-types";

export const OnLockNode = (node: Node, isLockedBy: string, setLockingNode: (node: Node) => void, dispatch: Dispatch) => {
  setLockingNode(node);
  if (!IsUnsaved(node)) dispatch(lockEntity(node.id, node.projectId, !node.isLocked, EntityType.Node));
  else
    dispatch(
      setLockedNode({
        id: node.id,
        projectId: node.projectId,
        isLocked: !node.isLocked,
        isLockedStatusBy: isLockedBy,
        isLockedStatusDate: new Date(), //.toISOString(),
        type: EntityType.Node,
      })
    );
};
