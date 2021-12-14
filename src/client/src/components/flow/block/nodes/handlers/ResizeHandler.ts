import { Size } from "../../../../../compLibrary/size";
import { IsDirectChild } from "../../../../../helpers";
import { Node } from "../../../../../models";
import { updateBlockPosition } from "../../../../../redux/store/project/actions";
import { GetFlowNodeByDataId } from "../../helpers";
import { setBlockNodeSize } from "../../redux/actions";
import { SetMarginX } from "../helpers/SetParentNodeSize";

/**
 * Component to handle responsive size of a ParentNode in BlockView.
 * @param node
 * @param secondaryNode
 * @param libOpen
 * @param explorerOpen
 * @param elements
 * @param dispatch
 */
const ResizeHandler = (
  node: Node,
  secondaryNode: Node,
  libOpen: boolean,
  explorerOpen: boolean,
  elements: any[],
  dispatch: any
) => {
  let screenWidth: number;
  let marginX: number;
  let width: number;

  const updateScreenSize = () => {
    screenWidth = secondaryNode ? window.innerWidth / 2.5 : window.innerWidth;
    marginX = SetMarginX(secondaryNode !== null, libOpen, explorerOpen);
    width = screenWidth - marginX;

    if (width > Size.BlockMaxWidth) width = Size.BlockMaxWidth;
    dispatch(setBlockNodeSize(width, window.innerHeight));
    updateChildXPosition();
  };

  const updateChildXPosition = () => {
    // Adjust X position relative to parent width
    elements.forEach((elem) => {
      if (IsDirectChild(elem.data, node)) {
        if (elem.data.positionBlockX > screenWidth - 100)
          dispatch(updateBlockPosition(elem.id, elem.data.positionBlockX - 5, elem.data.positionBlockY));
      }
    });
  };

  window.onresize = updateScreenSize;

  // Update the Flow parentNode
  const parentNode = GetFlowNodeByDataId(node?.id);
  if (parentNode) {
    parentNode.style.width = `${width}px`;
  }
};

export default ResizeHandler;
