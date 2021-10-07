import { IsFunction, IsLocation, IsProduct } from "../../helpers";
import { Node } from "../../../../models";
import { SPLITVIEW_POSITION } from "../../../../models/project";

/**
 * Function to return a position for the grid background used for Location nodes in SplitView.
 * @param node
 * @param splitViewNode
 * @returns a string containing the position.
 */
const SetSplitViewBackground = (node: Node, splitViewNode: Node) => {
  if (IsLocation(splitViewNode) && (IsFunction(node) || IsProduct(node))) return SPLITVIEW_POSITION.RIGHT;
};

export default SetSplitViewBackground;
