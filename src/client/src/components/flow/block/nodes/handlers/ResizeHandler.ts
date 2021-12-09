import { Node } from "../../../../../models";
import { BlockNodeSize } from "../../../../../models/project";
import { GetFlowNodeByDataId } from "../../helpers";
import { setBlockNodeWidth } from "../../redux/actions";
import { SetMarginX } from "../helpers/SetParentNodeSize";

/**
 * Component to handle responsive size of a ParentNode in BlockView.
 * @param node
 * @param secondaryNode
 * @param size
 * @param dispatch
 */
const ResizeHandler = (
  node: Node,
  secondaryNode: Node,
  size: BlockNodeSize,
  libOpen: boolean,
  explorerOpen: boolean,
  dispatch: any
) => {
  const updateScreenSize = () => {
    const width = secondaryNode ? window.innerWidth / 2.5 : window.innerWidth;
    const marginX = SetMarginX(width, secondaryNode, libOpen, explorerOpen);

    dispatch(setBlockNodeWidth(width - marginX));
  };

  window.onresize = updateScreenSize;

  // Update the Flow parentNode
  const parentNode = GetFlowNodeByDataId(node?.id);
  if (parentNode) {
    parentNode.style.width = `${size.width}px`;
    parentNode.style.height = `${size.height}px`;
  }
};

export default ResizeHandler;
