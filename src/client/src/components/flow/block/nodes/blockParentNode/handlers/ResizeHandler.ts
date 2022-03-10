import { Elements } from "react-flow-renderer";
import { Dispatch } from "redux";
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
  const updateScreenSize = () => {
    const width = SetParentNodeWidth(secondaryNode !== null, dispatch);
    updateChildXPosition(width);
  };

  const updateChildXPosition = (width: number) => {
    // Adjust X position relative to parent width
    elements.forEach((elem) => {
      if (IsDirectChild(elem.data, node) && elem.data.positionBlockX > width) {
        dispatch(updateBlockPosition(elem.id, elem.data.positionBlockX, elem.data.positionBlockY));
      }
    });
  };

  window.onresize = updateScreenSize;
};
