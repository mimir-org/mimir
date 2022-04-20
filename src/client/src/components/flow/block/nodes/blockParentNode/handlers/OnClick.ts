import { removeActiveEdge, setActiveBlockNode, setActiveNode } from "../../../../../../redux/store/project/actions";
import { Project } from "../../../../../../models";
import { GetChild } from "../helpers/GetChild";
import { Dispatch } from "redux";
import { GetParentNode } from "../../../../../../helpers/Family";

export const OnBlockParentClick = (dispatch: Dispatch, childNodeId: string, project: Project) => {
  const parentNode = GetParentNode(childNodeId, project);

  dispatch(removeActiveEdge());
  dispatch(setActiveBlockNode(parentNode?.id));
  dispatch(setActiveNode(parentNode?.id, true));
};

export const OnBlockChildClick = (dispatch: Dispatch, nodeId: string, project: Project) => {
  const childNodeId = GetChild(nodeId, project);

  dispatch(removeActiveEdge());
  dispatch(setActiveBlockNode(childNodeId));
  dispatch(setActiveNode(childNodeId, true));
};
