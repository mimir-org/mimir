import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";
import { Project } from "../../../../../../models";
import { GetChild } from "../helpers/GetChild";
import { Dispatch } from "redux";
import { GetParent } from "../../../../../../helpers/Family";

export const OnBlockParentClick = (dispatch: Dispatch, nodeId: string, project: Project) => {
  const parentNode = GetParent(nodeId, project);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(parentNode?.id));
  dispatch(setActiveNode(parentNode?.id, true));
};

export const OnBlockChildClick = (dispatch: Dispatch, nodeId: string, project: Project) => {
  const childNodeId = GetChild(nodeId, project);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(childNodeId));
  dispatch(setActiveNode(childNodeId, true));
};
