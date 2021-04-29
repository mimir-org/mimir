import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NodeType } from "../../../../models/project";
import { Node } from "../../../../models/project";
import { changeNodeVisibility } from "../../../../redux/store/project/actions";
import store from "../../../../redux/store";

export const useChangeNodeVisibility = (node: Node, type: NodeType) => {
  const dispatch = useDispatch();

  const edges = store.getState().projectState.project.edges;
  const isParent = edges.find((x) => x.fromNode === node.id) ? true : false;

  return useCallback(() => {
    dispatch(changeNodeVisibility(node, isParent, type));
  }, [dispatch, node, isParent, type]);
};

export default useChangeNodeVisibility;
