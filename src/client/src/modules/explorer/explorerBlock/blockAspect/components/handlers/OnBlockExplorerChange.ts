import { Dispatch } from "redux";
import { removeSecondaryNode, setSecondaryNode } from "../../../../../../redux/store/secondaryNode/actions";
import { IsDirectChild, IsFamily } from "../../../../../../helpers/Family";
import { Node } from "../../../../../../models";
import { SetFitToScreen } from "../../../../../../helpers";
import { ViewportData } from "../../../../../../models/project";
import {
  removeActiveBlockNode,
  removeActiveNode,
  setActiveNode,
  setBlockNodeVisibility,
} from "../../../../../../redux/store/project/actions";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * The BlockExplorer has a different functionality than the TreeExplorer.
 * The selectedNode is marked as chekced, and its children are marked with the mini checkmark.
 * SplitView is when two parentNodes are displayed - one selectedNode and one secondaryNode.
 * Two parentNodes of the same Aspect can be displayed, unless it is a direct parent/child relation.
 * @param node
 * @param selectedNode
 * @param secondaryNode
 * @param nodes
 * @param viewportData
 * @param dispatch
 */
export const OnBlockExplorerChange = (
  node: Node,
  selectedNode: Node,
  secondaryNode: Node,
  nodes: Node[],
  viewportData: ViewportData,
  dispatch: Dispatch
) => {
  if (!node) return;

  // Set selectedNode
  if (!selectedNode) {
    SetSelectedNode(nodes, node, dispatch);
    return;
  }

  // Toggle selectedNode off
  if (node.id === selectedNode.id && !secondaryNode) {
    RemoveSelectedNode(node, dispatch);
    return;
  }

  // Toggle child of selectedNode
  if (IsDirectChild(node, selectedNode)) {
    ToggleChildNode(node, dispatch);
    return;
  }

  // Add secondaryNode
  if (!secondaryNode) {
    if (ValidateNewSecondaryNode(node, selectedNode)) SetSecondaryNode(nodes, node, viewportData, dispatch);
    return;
  }

  // Remove secondaryNode
  if (node.id === secondaryNode.id) {
    RemoveSecondaryNode(viewportData, dispatch);
    return;
  }

  // Make secondaryNode the selectedNode
  if (node.id === selectedNode.id && secondaryNode) {
    RemoveSecondaryNode(viewportData, dispatch);
    SetSelectedNode(nodes, secondaryNode, dispatch);
    return;
  }

  // Toggle child of secondaryNode
  if (IsDirectChild(node, secondaryNode)) {
    ToggleChildNode(node, dispatch);
    return;
  }

  // Change secondaryNode
  if (node.id !== secondaryNode.id) {
    if (ValidateChangeSecondaryNode(node, secondaryNode)) dispatch(setSecondaryNode(node));
  }
};

//#region helpers
function ValidateChangeSecondaryNode(node: Node, secondaryNode: Node) {
  if (IsFamily(node, secondaryNode)) return !IsDirectChild(node, secondaryNode);
  if (!IsFamily(node, secondaryNode)) return true;
  return false;
}

function ValidateNewSecondaryNode(node: Node, selectedNode: Node) {
  if (IsFamily(node, selectedNode)) return !IsDirectChild(node, selectedNode);
  return true;
}

function RemoveSelectedNode(node: Node, dispatch: Dispatch) {
  dispatch(removeActiveNode());
  dispatch(removeActiveBlockNode());
  dispatch(setBlockNodeVisibility(node, true));
}

function SetSelectedNode(nodes: Node[], node: Node, dispatch: Dispatch) {
  dispatch(removeActiveNode());
  dispatch(setActiveNode(node.id, !node.selected));
  dispatch(setBlockNodeVisibility(node, false));
  ShowChildren(nodes, node, dispatch);
}

function ToggleChildNode(node: Node, dispatch: Dispatch) {
  const shouldBeHidden = !node.blockHidden;
  dispatch(setBlockNodeVisibility(node, shouldBeHidden));
}

function SetSecondaryNode(nodes: Node[], node: Node, viewportData: ViewportData, dispatch: Dispatch) {
  dispatch(setSecondaryNode(node));
  ShowChildren(nodes, node, dispatch);
  SetFitToScreen(viewportData, true);
}

function RemoveSecondaryNode(viewportData: ViewportData, dispatch: Dispatch) {
  dispatch(removeSecondaryNode());
  SetFitToScreen(viewportData, false);
}

function ShowChildren(nodes: Node[], node: Node, dispatch: Dispatch) {
  nodes.forEach((n) => {
    if (n.parentNodeId === node.id) dispatch(setBlockNodeVisibility(n, false));
  });
}
//#endregion
