import { Dispatch } from "redux";
import { updateBlockPosition } from "../../../../redux/store/project/actions";
import { Node as FlowNode } from "react-flow-renderer";

/**
 * Hook that runs when a Node has been dragged and moved in the canvas of Mimir in BlockView.
 * @param node
 * @param dispatch
 */
export const useOnDragStop = (node: FlowNode, dispatch: Dispatch) => {
  dispatch(updateBlockPosition(node.id, node.position.x, node.position.y));
};

export default useOnDragStop;
