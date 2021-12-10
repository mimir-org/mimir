import { Node } from "../../../../../models";
import { BlockNodeSize } from "../../../../../models/project";
import { GetFlowNodeByDataId } from "../../helpers";
import { SetMarginX } from "../helpers/SetParentNodeSize";

/**
 * Component to handle responsive size of a ParentNode in BlockView.
 * @param node
 * @param secondaryNode
 * @param size
 */
const ResizeHandler = (node: Node, secondaryNode: Node, size: BlockNodeSize, libOpen: boolean, explorerOpen: boolean) => {
  let width;
  let marginX;

  const updateScreenSize = () => {
    width = secondaryNode ? window.innerWidth / 2.5 : window.innerWidth;
    marginX = SetMarginX(width, secondaryNode, libOpen, explorerOpen);
  };

  window.onresize = updateScreenSize;

  // Update the Flow parentNode
  const parentNode = GetFlowNodeByDataId(node?.id);
  if (parentNode) {
    parentNode.style.width = `${size.width}px`;
    parentNode.style.height = `${size.height}px`;
  }

  return width - marginX;
};

export default ResizeHandler;
