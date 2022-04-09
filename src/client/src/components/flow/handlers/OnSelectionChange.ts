import { MutableRefObject } from "react";
import { Node as FlowNode, Edge as FlowEdge, OnSelectionChangeParams } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../compLibrary/size/Size";
import { Project } from "../../../models";
import { MODULE_TYPE } from "../../../models/project";
import { SetPanelHeight } from "../../../modules/inspector/helpers/SetPanelHeight";
import { changeInspectorHeight, changeInspectorTab } from "../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../redux/store/modules/modulesSlice";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../redux/store/project/actions";

/**
 * Component to handle selection of Nodes.
 * @param selectedItems
 * @param project
 * @param inspectorRef
 * @param dispatch
 * @param isBlockView
 */
export const HandleNodeSelection = (
  selectedItems: OnSelectionChangeParams,
  project: Project,
  inspectorRef: MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  isBlockView?: boolean
) => {
  const nodes = selectedItems.nodes;
  const edges = selectedItems.edges;

  if (!nodes.length && !edges.length) HandleNoSelect(project, inspectorRef, dispatch, isBlockView);
  else if (nodes.length === 1) HandleNodeSelect(nodes[0], dispatch, isBlockView);
  else if (edges.length === 1) HandleEdgeSelect(edges[0], dispatch, isBlockView);
  else if (nodes.length > 1) HandleMultiSelect(dispatch, isBlockView);
};

function HandleNodeSelect(flowNode: FlowNode, dispatch: Dispatch, isBlock = false) {
  dispatch(setActiveEdge(null, false));
  isBlock ? dispatch(setActiveBlockNode(flowNode.id)) : dispatch(setActiveNode(flowNode.id, true));
  OpenInspector(dispatch);
}

function HandleEdgeSelect(flowEdge: FlowEdge, dispatch: Dispatch, isBlock: boolean) {
  dispatch(setActiveEdge(flowEdge?.id, true));
  isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
  OpenInspector(dispatch);
}

function HandleMultiSelect(dispatch: Dispatch, isBlock: boolean) {
  isBlock ? dispatch(setActiveBlockNode(null)) : dispatch(setActiveNode(null, false));
  dispatch(setActiveEdge(null, false));
}

function HandleNoSelect(
  project: Project,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch,
  isBlock: boolean
) {
  if (!project) return;

  if (isBlock) {
    dispatch(setActiveBlockNode(null));
    dispatch(setActiveEdge(null, false));
  } else {
    dispatch(setActiveNode(null, false));
    dispatch(setActiveEdge(null, false));
  }
  CloseInspector(inspectorRef, dispatch);
}

export function OpenInspector(dispatch: Dispatch) {
  dispatch(changeInspectorTab(0));
}

export function CloseInspector(inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
  SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);
}
