import { GetChild } from "../helpers/GetChild";
import { Dispatch } from "redux";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import {
  removeSelectedBlockNode,
  removeSelectedEdge,
  removeSelectedNode,
  setSelectedBlockNode,
  setSelectedNode,
} from "../../../../../../redux/store/project/actions";
import { nodeService } from "../../../../../../services";

export const OnBlockParentClick = (dispatch: Dispatch, childNode: Node, edges: Edge[]) => {
  const parentNodeId = nodeService.getParentNodeId(childNode, edges);

  dispatch(removeSelectedEdge());
  dispatch(removeSelectedNode());
  dispatch(removeSelectedBlockNode());
  dispatch(setSelectedBlockNode(parentNodeId));
  dispatch(setSelectedNode(parentNodeId));
};

export const OnBlockChildClick = (dispatch: Dispatch, nodeId: string) => {
  const childNodeId = GetChild(nodeId);

  dispatch(removeSelectedEdge());
  dispatch(removeSelectedNode());
  dispatch(removeSelectedBlockNode());
  dispatch(setSelectedBlockNode(childNodeId));
  dispatch(setSelectedNode(childNodeId));
};
