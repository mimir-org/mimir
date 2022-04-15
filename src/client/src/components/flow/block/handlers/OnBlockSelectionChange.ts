import { MutableRefObject } from "react";
import { Node as FlowNode, Edge as FlowEdge, OnSelectionChangeParams } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { Project } from "../../../../models";
import { MODULE_TYPE } from "../../../../models/project";
import { SetPanelHeight } from "../../../../modules/inspector/helpers/SetPanelHeight";
import { changeInspectorHeight, changeInspectorTab } from "../../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../../redux/store/modules/modulesSlice";
import { setActiveBlockNode, setActiveEdge } from "../../../../redux/store/project/actions";

/**
 * Component to handle selection of Nodes in BlockView.
 * @param selectedItems
 * @param project
 * @param inspectorRef
 * @param dispatch
 */
export const HandleBlockNodeSelection = (
  selectedItems: OnSelectionChangeParams,
  project: Project,
  inspectorRef: MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  const nodes = selectedItems.nodes;
  const edges = selectedItems.edges;

  if (!nodes.length && !edges.length) HandleNoSelect(project, inspectorRef, dispatch);
  else if (nodes.length === 1) HandleBlockNodeSelect(nodes[0], dispatch);
  else if (edges.length === 1) HandleBlockEdgeSelect(edges[0], dispatch);
  else if (nodes.length > 1) HandleMultiSelect(dispatch);
};

function HandleBlockNodeSelect(flowNode: FlowNode, dispatch: Dispatch) {
  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(flowNode.id));
  OpenInspector(dispatch);
}

function HandleBlockEdgeSelect(flowEdge: FlowEdge, dispatch: Dispatch) {
  dispatch(setActiveEdge(flowEdge?.id, true));
  dispatch(setActiveBlockNode(null));
  OpenInspector(dispatch);
}

function HandleMultiSelect(dispatch: Dispatch) {
  dispatch(setActiveBlockNode(null));
  dispatch(setActiveEdge(null, false));
}

function HandleNoSelect(project: Project, inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  if (!project) return;

  dispatch(setActiveBlockNode(null));
  dispatch(setActiveEdge(null, false));

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
