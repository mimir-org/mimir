import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeNodeVisibility } from "../../../../redux/store/project/actions";
import { useSelector } from "react-redux";
import { Node, Edge, Project } from "../../../../models/project";
import { RootState } from "../../../../redux/store";

export const UseChangeNodeVisibility = (node: Node) => {
  const dispatch = useDispatch();
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  let isParent = false;
  let edge = project.edges?.find((x) => x.fromNode === node.id) as Edge;
  if (edge) isParent = true;

  return useCallback(() => {
    dispatch(changeNodeVisibility(node, isParent));
  }, [dispatch, node, isParent]);
};

export default UseChangeNodeVisibility;
