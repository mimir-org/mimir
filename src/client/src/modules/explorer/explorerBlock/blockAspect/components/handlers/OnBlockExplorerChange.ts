import { Dispatch } from "redux";
import { setActiveBlockNode, setActiveNode, setBlockNodeVisibility } from "../../../../../../redux/store/project/actions";
import { setSecondaryNode } from "../../../../../../redux/store/secondaryNode/actions";
import { IsDirectChild, IsFamily } from "../../../../../../helpers/Family";
import { Node } from "../../../../../../models";
import { SetZoomCenterLevel } from "../../../../../../helpers";
import { SetCenter, SetViewport } from "react-flow-renderer";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * The BlockExplorer has a different functionality than the TreeExplorer.
 * The selectedNode is marked as chekced, and its children are marked with the mini checkmark.
 * Currently two parentNodes can be displayed at the same time - selectedNode and secondaryNode
 * Two parentNodes of the same Aspect can be displayed, unless it is a direct parent/child relation.
 * @param node
 * @param selectedNode
 * @param secondaryNode
 * @param dispatch
 */
export const OnBlockExplorerChange = (
  node: Node,
  selectedNode: Node,
  secondaryNode: Node,
  dispatch: Dispatch,
  setViewport: SetViewport,
  setCenter: SetCenter
) => {
  if (!node) return;

  // Set selectedNode
  if (!selectedNode) {
    SetSelectedNode(node, dispatch);
    return;
  }

  // Toggle selectedNode off
  if (node.id === selectedNode.id) {
    UnselectSelectedNode(node, dispatch);
    return;
  }

  // Toggle child of selectedNode
  if (IsDirectChild(node, selectedNode)) {
    ToggleChildNode(node, dispatch);
    return;
  }

  // Add secondaryNode
  if (!secondaryNode) {
    dispatch(setSecondaryNode(node));
    SetZoomCenterLevel(setViewport, setCenter, true);
    return;
  }

  // Remove secondaryNode
  if (node.id === secondaryNode?.id) {
    dispatch(setSecondaryNode(null));
    SetZoomCenterLevel(setViewport, setCenter, false);
    return;
  }

  // Change secondaryNode
  if (node.id !== secondaryNode.id) {
    if (ValidateSecondaryNode(node, secondaryNode)) dispatch(setSecondaryNode(node));
  }
};

function ValidateSecondaryNode(node: Node, secondaryNode: Node) {
  if (IsFamily(node, secondaryNode)) return !IsDirectChild(node, secondaryNode);
  if (!IsFamily(node, secondaryNode)) return true;
  return false;
}

function UnselectSelectedNode(node: Node, dispatch: Dispatch) {
  dispatch(setActiveNode(null, false));
  dispatch(setActiveBlockNode(null));
  dispatch(setBlockNodeVisibility(node, true));
}

function SetSelectedNode(node: Node, dispatch: Dispatch) {
  dispatch(setActiveNode(node.id, !node.selected));
  dispatch(setActiveBlockNode(node.id));
  dispatch(setBlockNodeVisibility(node, false));
}

function ToggleChildNode(node: Node, dispatch: Dispatch) {
  const shouldBeHidden = !node.blockHidden;
  dispatch(setBlockNodeVisibility(node, shouldBeHidden));
}
