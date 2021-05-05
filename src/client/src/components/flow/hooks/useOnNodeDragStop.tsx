import { NODE_TYPE } from "../../../models/project";
import { GetReactFlowBoundingRectData } from "../helpers";
import { updatePosition } from "../../../redux/store/project/actions";

export const useOnNodeDragStop = (_event, node, dispatch) => {
  const [width] = GetReactFlowBoundingRectData();
  const x = node.type === NODE_TYPE.OFF_PAGE ? width - 120 : node.position.x;

  dispatch(updatePosition(node.id, x, node.position.y));
};

export default useOnNodeDragStop;
