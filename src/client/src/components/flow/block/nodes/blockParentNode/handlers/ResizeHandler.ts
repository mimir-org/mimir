import { Elements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { IsDirectChild } from "../../../../../../helpers";
import { Node } from "../../../../../../models";
import { updateBlockPosition } from "../../../../../../redux/store/project/actions";
import { GetFlowNodeByDataId } from "../helpers/GetFlowNodeByDataId";
import { SetParentNodeWidth } from "../../../builders/helpers/SetParentNodeWidth";

/**
 * Component to handle responsive size of a ParentNode in BlockView.
 * @param node
 * @param secondaryNode
 * @param libOpen
 * @param explorerOpen
 * @param elements
 * @param dispatch
 */
export const ResizeHandler = (
  node: Node,
  secondaryNode: Node,
  libOpen: boolean,
  explorerOpen: boolean,
  elements: Elements<Node>,
  dispatch: Dispatch
) => {
  let screenWidth: number;
  let width: number;

  const updateScreenSize = () => {
    SetParentNodeWidth(secondaryNode !== null, libOpen, explorerOpen, dispatch);
    updateChildXPosition();
  };

  const updateChildXPosition = () => {
    // Adjust X position relative to parent width
    elements.forEach((elem) => {
      if (IsDirectChild(elem.data, node) && elem.data.positionBlockX > screenWidth - 100) {
        dispatch(updateBlockPosition(elem.id, elem.data.positionBlockX - 5, elem.data.positionBlockY));
      }
    });
  };

  window.onresize = updateScreenSize;

  // Update the Flow parentNode
  const parentNode = GetFlowNodeByDataId(node?.id);
  if (parentNode) parentNode.style.width = `${width}px`;
};
