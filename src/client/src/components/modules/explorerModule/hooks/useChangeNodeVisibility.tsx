import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Edge, NodeType, RELATION_TYPE } from "../../../../models/project";
import { changeNodeVisibility } from "../../../../redux/store/project/actions";
import { useSelector } from "react-redux";
import { Node, Project } from "../../../../models/project";
import { RootState } from "../../../../redux/store";

export const UseChangeNodeVisibility = (node: Node, type: NodeType) => {
  const dispatch = useDispatch();
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  let isParent = false;

  let edge = project.edges?.find((x) => x.fromNode === node.id) as Edge;
  let connectorType = node?.connectors?.find(
    (x) => x.id === edge?.fromConnector
  )?.relationType;

  if (edge && connectorType === RELATION_TYPE.PartOf) isParent = true;

  return useCallback(() => {
    dispatch(changeNodeVisibility(node, isParent, type));
  }, [dispatch, node, isParent, type]);
};

export default UseChangeNodeVisibility;
