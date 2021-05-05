import { NODE_TYPE } from "../../../models/project";
import { GetReactFlowBoundingRectData } from "../helpers";
import { updatePosition } from "../../../redux/store/project/actions";
import { useDispatch } from "react-redux";

export const useOnNodeDragStop = (_event, node) => {
  const dispatch = useDispatch();
  console.log("test");

  const [width] = GetReactFlowBoundingRectData();
  const x = node.type === NODE_TYPE.OFF_PAGE ? width - 120 : node.position.x;

  return dispatch(updatePosition(node.id, x, node.position.y));
};

export default useOnNodeDragStop;
