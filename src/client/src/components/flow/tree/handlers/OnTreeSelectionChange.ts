import { MutableRefObject } from "react";
import { Node as FlowNode, Edge as FlowEdge, OnSelectionChangeParams } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { Project } from "../../../../models";
import { MODULE_TYPE } from "../../../../models/project";
import { SetPanelHeight } from "../../../../modules/inspector/helpers/SetPanelHeight";
import { changeInspectorHeight, changeInspectorTab } from "../../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../../redux/store/modules/modulesSlice";
import { removeActiveEdge, removeActiveNode, setActiveEdge, setActiveNode } from "../../../../redux/store/project/actions";

/**
 * Component to handle selection of Nodes in TreeView.
 * @param selectedItems
 * @param project
 * @param inspectorRef
 * @param dispatch
 */
export const HandleTreeNodeSelection = (
  selectedItems: OnSelectionChangeParams,
  project: Project,
  inspectorRef: MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  const nodes = selectedItems.nodes;
  const edges = selectedItems.edges;

  if (!nodes.length && !edges.length) HandleNoSelect(project, inspectorRef, dispatch);
  else if (nodes.length === 1) HandleNodeSelect(nodes[0], dispatch);
  else if (edges.length === 1) HandleEdgeSelect(edges[0], dispatch);
  else if (nodes.length > 1) HandleMultiSelect(dispatch);
};

function HandleNodeSelect(flowNode: FlowNode, dispatch: Dispatch) {
  dispatch(removeActiveEdge());
  dispatch(setActiveNode(flowNode.id, true));
  OpenInspector(dispatch);
}

function HandleEdgeSelect(flowEdge: FlowEdge, dispatch: Dispatch) {
  dispatch(setActiveEdge(flowEdge?.id, true));
  dispatch(removeActiveNode());
  OpenInspector(dispatch);
}

function HandleMultiSelect(dispatch: Dispatch) {
  dispatch(removeActiveNode());
  dispatch(removeActiveEdge());
}

function HandleNoSelect(project: Project, inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  if (!project) return;

  dispatch(removeActiveNode());
  dispatch(removeActiveEdge());

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
