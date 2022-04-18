import { Dispatch } from "redux";
import { setNodeVisibility } from "../../../../../redux/store/project/actions";
import { Node } from "../../../../../models";

/**
 * Handler for changing visibility of a node in the TreeView's Explorer.
 * @param node
 * @param dispatch
 */
export const OnTreeExplorerChange = (node: Node, dispatch: Dispatch) => dispatch(setNodeVisibility(node));
