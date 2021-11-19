import { useCallback } from "react";
import { setIsLockedNode } from "../../../redux/store/project/actions";
import { Node } from "../../../models";
import { projectSelector, useAppDispatch, useAppSelector } from "../../../redux/store";

const OnLockNode = (node: Node) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);

  return useCallback(() => {
    dispatch(setIsLockedNode(node, project, !node.isLocked));
  }, [dispatch, node, project]);
};

export default OnLockNode;
