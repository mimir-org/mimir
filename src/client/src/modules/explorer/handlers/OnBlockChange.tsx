import { setActiveBlockNode, setActiveNode, setNodeVisibility } from "../../../redux/store/project/actions";
import { Node, Project } from "../../../models";
import { setSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { IsDirectChild } from "../../../components/flow/block/helpers";

export const OnBlockChange = (node: Node, project: Project, selectedNode: Node, secondaryNode: Node, dispatch: any) => {
  let isParent = false;
  const edge = project.edges?.find((x) => x.fromNodeId === node.id);
  if (edge) isParent = true;

  const activeNode = !node.isSelected ? node.id : null;

  if (!selectedNode) {
    dispatch(setActiveNode(activeNode, !node.isSelected));
    dispatch(setActiveBlockNode(activeNode));
    dispatch(setSecondaryNode(null));
  }

  if (selectedNode) {
    if (node.id === secondaryNode?.id) dispatch(setSecondaryNode(null));
    if (node.id !== selectedNode.id && node.id !== secondaryNode?.id && !IsDirectChild(node, selectedNode)) {
      dispatch(setSecondaryNode(node));
      dispatch(setActiveNode(selectedNode.id, true));
    }
    if (node.id === selectedNode.id) dispatch(setActiveNode(activeNode, !node.isSelected));
  }

  dispatch(setNodeVisibility(node, isParent));
};

export default OnBlockChange;
