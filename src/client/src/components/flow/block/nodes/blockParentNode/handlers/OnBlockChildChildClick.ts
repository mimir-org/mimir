import { Project } from "../../../../../../models";
import { GetChild } from "../helpers/GetChild";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";
import { Dispatch } from "redux";

const OnBlockChildClick = (dispatch: Dispatch, nodeId: string, project: Project) => {
  const childNodeId = GetChild(nodeId, project);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(childNodeId));
  dispatch(setActiveNode(childNodeId, true));
};

export default OnBlockChildClick;
