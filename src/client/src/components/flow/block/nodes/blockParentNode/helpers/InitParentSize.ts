import { Dispatch } from "redux";
import { Size } from "../../../../../../compLibrary/size/Size";
import { Node } from "../../../../../../models";
import { updateBlockSize } from "../../../../../../redux/store/project/actions";

/**
 * Component to ensure that the ParentNode size has been initialized.
 * @param node
 * @param dispatch
 */
export const InitParentSize = (node: Node, dispatch: Dispatch) => {
  if (
    node?.width === null ||
    node?.height === null ||
    node?.width === undefined ||
    node?.height === undefined ||
    node?.width < Size.BLOCK_NODE_MIN_WIDTH ||
    node?.height < Size.BLOCK_NODE_MIN_HEIGHT
  ) {
    const size = { width: Size.BLOCK_NODE_WIDTH, height: Size.BLOCK_NODE_HEIGHT };
    dispatch(updateBlockSize(node.id, size));
  }
};
