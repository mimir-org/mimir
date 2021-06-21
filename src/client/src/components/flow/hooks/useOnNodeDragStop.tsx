import { updateBlockPosition } from "../../../redux/store/project/actions";

export const useOnNodeDragStop = (_event, node, dispatch) => {
  dispatch(updateBlockPosition(node.id, node.position.x, node.position.y));
};

export default useOnNodeDragStop;
