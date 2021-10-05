import { Node, Edge } from "../../../../../models";
import { GetParent } from "../../../helpers";
import {
  setActiveBlockNode,
  setActiveEdge,
  setActiveNode,
} from "../../../../../redux/store/project/actions";

const OnParentClick = (dispatch: any, node: Node, nodes: Node[], edges: Edge[]) => {
  const parentNode = GetParent(node, nodes, edges);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(parentNode.id));
  dispatch(setActiveNode(parentNode.id, true));
};

export default OnParentClick;
