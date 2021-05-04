import { useDispatch } from "react-redux";
import { GetReactFlowBoundingRectData } from ".";
import { NODE_TYPE } from "../../../models/project";
import store from "../../../redux/store";
import { updatePosition } from "../../../redux/store/project/actions";

const useRepositionNodes = () => {
  const dispatch = useDispatch();
  const nodes = store
    .getState()
    .projectState.project.nodes.find(
      (node) => node.type === NODE_TYPE.OFF_PAGE
    );

  const node = nodes[0];

  const [width] = GetReactFlowBoundingRectData();
  const x = width - 120;
  //   dispatch(updatePosition(node.id, x, node.position.y));

  console.log({ nodes });

  return nodes;
};

export default useRepositionNodes;
