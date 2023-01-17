import { Dispatch } from "redux";
import { Node } from "@mimirorg/modelbuilder-types";
import {
  removeSelectedBlockNode,
  setSelectedBlockNode,
  setBlockNodeVisibility,
} from "../../../../../../redux/store/project/actions";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * The BlockExplorer has a different functionality than the TreeExplorer, and this one has to handle multiple cases.
 * The selectedNode is marked as chekced, and its children are marked with the mini checkmark.
 * @param node
 * @param nodes
 * @param dispatch
 */
export const OnBlockExplorerChange = (node: Node, nodes: Node[], dispatch: Dispatch) => {
  if (!node) return;
  dispatch(removeSelectedBlockNode());
  dispatch(setSelectedBlockNode(node.id));
  dispatch(setBlockNodeVisibility(node, false));
  ShowChildren(nodes, node, dispatch);
};

function ShowChildren(nodes: Node[], node: Node, dispatch: Dispatch) {
  nodes.forEach((n) => {
    if (n.parentNodeId === node.id) dispatch(setBlockNodeVisibility(n, false));
  });
}
