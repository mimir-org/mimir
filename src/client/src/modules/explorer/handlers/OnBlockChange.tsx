import { setActiveBlockNode, setActiveNode, setNodeVisibility } from "../../../redux/store/project/actions";
import { Node, Project } from "../../../models";
import { setSplitParentNode } from "../../../redux/store/splitView/actions";
import { IsDirectChild } from "../../../components/flow/block/helpers";

export const OnBlockChange = (node: Node, project: Project, selectedNode: Node, splitNode: Node, dispatch: any) => {
  let isParent = false;
  const edge = project.edges?.find((x) => x.fromNodeId === node.id);
  if (edge) isParent = true;

  const activeNode = !node.isSelected ? node.id : null;

  if (!selectedNode) {
    dispatch(setActiveNode(activeNode, !node.isSelected));
    dispatch(setActiveBlockNode(activeNode));
    dispatch(setSplitParentNode(null));
  }

  if (selectedNode) {
    if (node.id === splitNode?.id) dispatch(setSplitParentNode(null));
    if (node.id !== selectedNode.id && node.id !== splitNode?.id && !IsDirectChild(node, selectedNode)) {
      dispatch(setSplitParentNode(node));
      dispatch(setActiveNode(selectedNode.id, true));
    }
    if (node.id === selectedNode.id) dispatch(setActiveNode(activeNode, !node.isSelected));
  }

  dispatch(setNodeVisibility(node, isParent));
};

export default OnBlockChange;
