import { useCallback } from "react";
import { setIsLockedNode } from "../../../redux/store/project/actions";
import { Node, Project } from "../../../models";
import { useAppDispatch } from "../../../redux/store";

const OnLockNode = (node: Node, project: Project, isLocked: boolean) => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(setIsLockedNode(node, project, isLocked));
  }, [dispatch, node, project, isLocked]);
};

export default OnLockNode;
