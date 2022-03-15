import { Dispatch } from "redux";
import { setActiveBlockNode, updateBlockPosition } from "../../../redux/store/project/actions";
import { Node as FlowNode } from "react-flow-renderer";

/**
 * Hook that runs when a Node has been dragged and moved in the canvas of Mimir.
 * @param _event
 * @param node
 * @param dispatch
 */
export const useOnDragStop = (_event: React.DragEvent<HTMLDivElement>, node: FlowNode, dispatch: Dispatch) => {
  dispatch(updateBlockPosition(node.id, node.position.x, node.position.y));
  dispatch(setActiveBlockNode(node.id));
};

export default useOnDragStop;
