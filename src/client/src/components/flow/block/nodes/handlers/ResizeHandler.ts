import { Node } from "../../../../../models";
import { GetFlowNodeByDataId } from "../../helpers";
import { SetMarginX } from "../helpers/SetParentNodeSize";

/**
 * Component to handle responsive size of a ParentNode in BlockView.
 * @param node
 * @param secondaryNode
 * @param size
 */
const ResizeHandler = (node: Node, secondaryNode: Node, setWidth: any, libOpen: boolean, explorerOpen: boolean) => {
  let width;
  let marginX;
  console.log("test");

  const updateScreenSize = () => {
    width = secondaryNode ? window.innerWidth / 2.5 : window.innerWidth;
    marginX = SetMarginX(width, secondaryNode, libOpen, explorerOpen);

    setWidth(width - marginX);
  };

  window.onresize = updateScreenSize;

  // Update the Flow parentNode
  const parentNode = GetFlowNodeByDataId(node?.id);
  if (parentNode) {
    parentNode.style.width = `${width - marginX}px`;
    // parentNode.style.height = `${height}px`;
  }
};

export default ResizeHandler;
