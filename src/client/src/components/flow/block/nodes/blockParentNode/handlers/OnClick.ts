import { GetChild } from "../helpers/GetChild";
import { Dispatch } from "redux";
import { GetParentNode } from "../../../../../../helpers/Family";
import {
  removeActiveBlockNode,
  removeActiveEdge,
  removeActiveNode,
  setActiveBlockNode,
  setActiveNode,
} from "../../../../../../redux/store/project/actions";

export const OnBlockParentClick = (dispatch: Dispatch, childNodeId: string) => {
  const parentNode = GetParentNode(childNodeId);

  dispatch(removeActiveEdge());
  dispatch(removeActiveNode());
  dispatch(removeActiveBlockNode());
  dispatch(setActiveBlockNode(parentNode?.id));
  dispatch(setActiveNode(parentNode?.id, true));
};

export const OnBlockChildClick = (dispatch: Dispatch, nodeId: string) => {
  const childNodeId = GetChild(nodeId);

  dispatch(removeActiveEdge());
  dispatch(removeActiveNode());
  dispatch(removeActiveBlockNode());
  dispatch(setActiveBlockNode(childNodeId));
  dispatch(setActiveNode(childNodeId, true));
};
