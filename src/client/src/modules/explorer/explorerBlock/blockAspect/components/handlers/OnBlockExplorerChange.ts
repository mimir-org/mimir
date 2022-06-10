import { Dispatch } from "redux";
import { removeSecondaryNode, setSecondaryNode } from "../../../../../../redux/store/secondaryNode/actions";
import { IsDirectChild, IsFamily } from "../../../../../../helpers/Family";
import { Node } from "@mimirorg/modelbuilder-types";
import { SetFitToScreen } from "../../../../../../helpers";
import { ViewportData } from "../../../../../../models/project";
import {
  removeSelectedBlockNode,
  removeSelectedNode,
  setSelectedBlockNode,
  setBlockNodeVisibility,
} from "../../../../../../redux/store/project/actions";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * The BlockExplorer has a different functionality than the TreeExplorer.
 * The selectedNode is marked as chekced, and its children are marked with the mini checkmark.
 * SplitView is when two parentNodes are displayed - one selectedNode and one secondaryNode.
 * Two parentNodes of the same Aspect can be displayed, unless it is a direct parent/child relation.
 * @param node
 * @param selectedBlockNode
 * @param secondaryNode
 * @param nodes
 * @param viewportData
 * @param dispatch
 */
export const OnBlockExplorerChange = (
  node: Node,
  selectedBlockNode: Node,
  secondaryNode: Node,
  nodes: Node[],
  viewportData: ViewportData,
  dispatch: Dispatch
) => {
  if (!node) return;

  // Set selectedBlockNode
  if (!selectedBlockNode) {
    SetSelectedBlockNode(nodes, node, dispatch);
    return;
  }

  // Toggle selectedBlockNode off
  if (node.id === selectedBlockNode.id && !secondaryNode) {
    RemoveSelectedBlockNode(node, dispatch);
    return;
  }

  // Toggle child of selectedBlockNode
  if (IsDirectChild(node, selectedBlockNode)) {
    ToggleChildNode(node, dispatch);
    return;
  }

  // Add secondaryNode
  if (!secondaryNode) {
    if (ValidateNewSecondaryNode(node, selectedBlockNode)) SetSecondaryNode(nodes, node, viewportData, dispatch);
    return;
  }

  // Remove secondaryNode
  if (node.id === secondaryNode.id) {
    RemoveSecondaryNode(viewportData, dispatch);
    return;
  }

  // Make secondaryNode the selectedBlockNode
  if (node.id === selectedBlockNode.id && secondaryNode) {
    RemoveSecondaryNode(viewportData, dispatch);
    SetSelectedBlockNode(nodes, secondaryNode, dispatch);
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

function RemoveSelectedBlockNode(node: Node, dispatch: Dispatch) {
  dispatch(removeSelectedNode());
  dispatch(removeSelectedBlockNode());
  dispatch(setBlockNodeVisibility(node, true));
}

function SetSelectedBlockNode(nodes: Node[], node: Node, dispatch: Dispatch) {
  dispatch(removeSelectedNode());
  dispatch(setSelectedBlockNode(node.id));
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
