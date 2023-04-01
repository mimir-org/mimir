import { Dispatch } from "redux";
import { AspectObject } from "lib";
// import {
//   removeSelectedBlockNode,
//   removeSelectedEdge,
//   removeSelectedNode,
//   setSelectedBlockNode,
//   setSelectedNode,
// } from "../../../../../../redux/store/project/actions";

export const OnBlockParentClick = (dispatch: Dispatch, childNode: AspectObject) => {
  // const parentNodeId = childNode.parentNodeId;
  // dispatch(removeSelectedEdge());
  // dispatch(removeSelectedNode());
  // dispatch(removeSelectedBlockNode());
  // dispatch(setSelectedBlockNode(parentNodeId));
  // dispatch(setSelectedNode(parentNodeId));
};

export const OnBlockChildClick = (dispatch: Dispatch, nodeId: string) => {
  // const childNodeId = GetChild(nodeId);
  // dispatch(removeSelectedEdge());
  // dispatch(removeSelectedNode());
  // dispatch(removeSelectedBlockNode());
  // dispatch(setSelectedBlockNode(childNodeId));
  // dispatch(setSelectedNode(childNodeId));
};
