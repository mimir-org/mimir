import { Edge, Node } from "../../../../../../models";
import { GetChild } from "../helpers/GetChild";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";
import { Dispatch } from "redux";

const OnChildClick = (dispatch: Dispatch, node: Node, nodes: Node[], edges: Edge[]) => {
  const childNode = GetChild(node, nodes, edges);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(childNode.id));
  dispatch(setActiveNode(childNode.id, true));
};

export default OnChildClick;
