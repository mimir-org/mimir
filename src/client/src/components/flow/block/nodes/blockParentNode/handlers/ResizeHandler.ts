import { Elements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../../../compLibrary/size";
import { IsDirectChild } from "../../../../../../helpers";
import { Node } from "../../../../../../models";
import { updateBlockPosition } from "../../../../../../redux/store/project/actions";
import { SetParentNodeWidth } from "../../../builders/helpers/SetParentNodeWidth";

/**
 * Component to handle responsive size of a ParentNode in BlockView.
 * @param node
 * @param secondaryNode
 * @param elements
 * @param dispatch
 */
export const ResizeHandler = (node: Node, secondaryNode: Node, elements: Elements<Node>, dispatch: Dispatch) => {
  let screenWidth = secondaryNode ? window.innerWidth / Size.BLOCK_SPLITVIEW_DIVISOR : window.innerWidth - Size.BLOCK_MARGIN_X;

  const updateScreenSize = () => {
    screenWidth = SetParentNodeWidth(secondaryNode !== null, dispatch);
    updateChildXPosition();
  };

  const updateChildXPosition = () => {
    // Adjust X position relative to parent width
    elements.forEach((elem) => {
      if (IsDirectChild(elem.data, node) && elem.data.positionBlockX > screenWidth) {
        dispatch(updateBlockPosition(elem.id, elem.data.positionBlockX, elem.data.positionBlockY));
      }
    });
  };

  window.onresize = updateScreenSize;
};
