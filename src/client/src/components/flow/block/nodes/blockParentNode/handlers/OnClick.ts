import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";
import { Project } from "../../../../../../models";
import { GetChild } from "../helpers/GetChild";
import { Dispatch } from "redux";

export const OnBlockParentClick = (dispatch: Dispatch, parentNodeId: string) => {
  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(parentNodeId));
  dispatch(setActiveNode(parentNodeId, true));
};

export const OnBlockChildClick = (dispatch: Dispatch, nodeId: string, project: Project) => {
  const childNodeId = GetChild(nodeId, project);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(childNodeId));
  dispatch(setActiveNode(childNodeId, true));
};
