import { NODE_TYPE } from "../../../models/project";
import { GetFlowRectData } from "../helpers";
import {
  updatePosition,
  updateBlockPosition,
} from "../../../redux/store/project/actions";

export const useOnNodeDragStop = (_event, node, dispatch, isBlock) => {
  const [width] = GetFlowRectData();
  const x = node.type === NODE_TYPE.OFF_PAGE ? width - 25 : node.position.x;

  if (isBlock) dispatch(updateBlockPosition(node.id, x, node.position.y));
  else dispatch(updatePosition(node.id, x, node.position.y));
};

export default useOnNodeDragStop;
