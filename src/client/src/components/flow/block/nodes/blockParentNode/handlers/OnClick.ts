import { GetChild } from "../helpers/GetChild";
import { Dispatch } from "redux";
import { Node } from "../../../../../../models";
import {
  removeActiveBlockNode,
  removeActiveEdge,
  removeActiveNode,
  setActiveBlockNode,
  setActiveNode,
} from "../../../../../../redux/store/project/actions";

export const OnBlockParentClick = (dispatch: Dispatch, childNode: Node) => {
  const parentNodeId = childNode.parentNodeId;

  dispatch(removeActiveEdge());
  dispatch(removeActiveNode());
  dispatch(removeActiveBlockNode());
  dispatch(setActiveBlockNode(parentNodeId));
  dispatch(setActiveNode(parentNodeId));
};

export const OnBlockChildClick = (dispatch: Dispatch, nodeId: string) => {
  const childNodeId = GetChild(nodeId);

  dispatch(removeActiveEdge());
  dispatch(removeActiveNode());
  dispatch(removeActiveBlockNode());
  dispatch(setActiveBlockNode(childNodeId));
  dispatch(setActiveNode(childNodeId));
};
