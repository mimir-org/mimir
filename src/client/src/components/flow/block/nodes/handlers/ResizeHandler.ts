import { IsDirectChild } from "../../../../../helpers";
import { Node } from "../../../../../models";
import { updateBlockPosition } from "../../../../../redux/store/project/actions";
import { GetFlowNodeByDataId } from "../../helpers";
import { SetMarginX } from "../helpers/SetParentNodeSize";

/**
 * Component to handle responsive size of a ParentNode in BlockView.
 * @param node
 * @param secondaryNode
 * @param setWidth
 * @param libOpen
 * @param explorerOpen
 * @param elements
 * @param dispatch
 */
const ResizeHandler = (
  node: Node,
  secondaryNode: Node,
  setWidth: any,
  libOpen: boolean,
  explorerOpen: boolean,
  elements: any[],
  dispatch: any
) => {
  let width: number;
  let marginX: number;

  const updateScreenSize = () => {
    width = secondaryNode ? window.innerWidth / 2.5 : window.innerWidth;
    marginX = SetMarginX(width, secondaryNode, libOpen, explorerOpen);

    setWidth(width - marginX);
    updateChildXPosition();
  };

  const updateChildXPosition = () => {
    // Adjust X position relative to parent width
    elements.forEach((elem) => {
      if (IsDirectChild(elem.data, node)) {
        if (elem.data.positionBlockX > width - 100)
          dispatch(updateBlockPosition(elem.id, elem.data.positionBlockX - 5, elem.data.positionBlockY));
      }
    });
  };

  window.onresize = updateScreenSize;

  // Update the Flow parentNode
  const parentNode = GetFlowNodeByDataId(node?.id);
  if (parentNode) {
    parentNode.style.width = `${width - marginX}px`;
  }
};

export default ResizeHandler;
