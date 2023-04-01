import { Dispatch } from "redux";
import { AspectObject } from "lib";

/**
 * Component to handle all clicks on checkboxes in the BlockView's Explorer Module.
 * The BlockExplorer has a different functionality than the TreeExplorer, and this one has to handle multiple cases.
 * The selectedNode is marked as chekced, and its children are marked with the mini checkmark.
 * @param node
 * @param nodes
 * @param dispatch
 */
export const OnBlockExplorerChange = (node: AspectObject, nodes: AspectObject[], dispatch: Dispatch) => {
  if (!node) return;
  // dispatch(removeSelectedBlockNode());
  // dispatch(setSelectedBlockNode(node.id));
  // dispatch(setBlockNodeVisibility(node, false));
  ShowChildren(nodes, node, dispatch);
};

function ShowChildren(nodes: AspectObject[], node: AspectObject, dispatch: Dispatch) {
  // nodes.forEach((n) => {
  //   if (n.parentNodeId === node.id) dispatch(setBlockNodeVisibility(n, false));
  // });
}
