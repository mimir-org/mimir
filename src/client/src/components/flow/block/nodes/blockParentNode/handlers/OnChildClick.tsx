import { Node, Edge } from "../../../../../../models";
import { GetChild } from "../../../../helpers";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";

const OnChildClick = (dispatch: any, node: Node, nodes: Node[], edges: Edge[]) => {
  const childNode = GetChild(node, nodes, edges);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(childNode.id));
  dispatch(setActiveNode(childNode.id, true));
};

export default OnChildClick;
