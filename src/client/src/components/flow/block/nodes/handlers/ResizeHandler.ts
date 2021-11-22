import { Size } from "../../../../../compLibrary/size";
import { Node } from "../../../../../models";
import { BlockNodeSize } from "../../../../../models/project";
import { GetNodeByDataId } from "../../helpers";
import { setBlockNodeSize } from "../../redux/actions";

/**
 * Component to handle responsive size of a ParentNode in BlockView.
 * @param node
 * @param secondaryNode
 * @param size
 * @param dispatch
 */
const ResizeHandler = (node: Node, secondaryNode: Node, size: BlockNodeSize, dispatch: any) => {
  const updateScreenSize = () => {
    const width = secondaryNode ? window.innerWidth / 2 : window.innerWidth;
    const marginX = secondaryNode ? Size.BlockSecondaryMarginX : Size.BlockMarginX;

    dispatch(setBlockNodeSize(width - marginX, Size.BlockHeight));
  };

  window.onresize = updateScreenSize;

  // Update the Flow parentNode
  const parentNode = GetNodeByDataId(node?.id);
  if (parentNode) {
    parentNode.style.width = `${size.width}px`;
    parentNode.style.height = `${size.height}px`;
  }
};

export default ResizeHandler;
