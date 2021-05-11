import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { NodeType } from "../../../../models/project";
import { changeNodeVisibility } from "../../../../redux/store/project/actions";
import { useSelector } from "react-redux";
import { Node, Project } from "../../../../models/project";
import { RootState } from "../../../../redux/store";

export const useChangeNodeVisibility = (node: Node, type: NodeType) => {
  const dispatch = useDispatch();

  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  let edges = [];
  let isParent = false;

  if (project && project.edges) {
    edges = project.edges;
    isParent = edges.find((x) => x.fromNode === node.id);
  }

  return useCallback(() => {
    dispatch(changeNodeVisibility(node, isParent, type));
  }, [dispatch, node, isParent, type]);
};

export default useChangeNodeVisibility;
