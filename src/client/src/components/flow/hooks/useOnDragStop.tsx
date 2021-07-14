import { updateBlockPosition } from "../../../redux/store/project/actions";

export const useOnDragStop = (_event, node, dispatch) => {
  dispatch(updateBlockPosition(node.id, node.position.x, node.position.y));
};

export default useOnDragStop;
