import { Node, Project } from "../../../../../../models";
import { GetChild } from "../helpers/GetChild";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";
import { Dispatch } from "redux";

const OnChildClick = (dispatch: Dispatch, node: Node, project: Project) => {
  const childNode = GetChild(node, project);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(childNode.id));
  dispatch(setActiveNode(childNode.id, true));
};

export default OnChildClick;
