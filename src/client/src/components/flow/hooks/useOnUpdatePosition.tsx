import { NODE_TYPE } from "../../../models/project";
import { updatePosition } from "../../../redux/store/project/actions";
import { GetReactFlowBoundingRectData } from "./../helpers";

const useOnUpdatePosition = (projectState, dispatch) => {
  const [width] = GetReactFlowBoundingRectData();
  const x = width - 25;
  projectState.project.nodes.forEach((node) => {
    if (node.type === NODE_TYPE.OFF_PAGE) {
      dispatch(updatePosition(node.id, x, node.positionY));
    }
  });
};

export default useOnUpdatePosition;
