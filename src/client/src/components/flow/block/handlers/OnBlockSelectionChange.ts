import { MutableRefObject } from "react";
import { Node as FlowNode, Edge as FlowEdge, OnSelectionChangeParams } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { Node } from "../../../../models";
import { MODULE_TYPE } from "../../../../models/project";
import { SetPanelHeight } from "../../../../modules/inspector/helpers/SetPanelHeight";
import { changeInspectorHeight, changeInspectorTab } from "../../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../../redux/store/modules/modulesSlice";
import {
  removeActiveBlockNode,
  removeActiveEdge,
  setActiveBlockNode,
  setActiveEdge,
} from "../../../../redux/store/project/actions";

/**
 * Component to handle selection of Nodes in BlockView.
 * @param selectedItems
 * @param selectedNode
 * @param inspectorRef
 * @param dispatch
 */
export const OnBlockSelectionChange = (
  selectedItems: OnSelectionChangeParams,
  selectedNode: Node,
  inspectorRef: MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  const selectedFlowNodes = selectedItems.nodes;
  const selectedFlowEdges = selectedItems.edges;

  if (!selectedFlowNodes.length && !selectedFlowEdges.length) HandleNoSelect(inspectorRef, dispatch);
  else if (selectedFlowNodes.length === 1) HandleBlockNodeSelect(selectedFlowNodes[0], selectedNode, dispatch);
  else if (selectedFlowEdges.length === 1) HandleBlockEdgeSelect(selectedFlowEdges[0], dispatch);
  else if (selectedFlowNodes.length > 1) HandleMultiSelect(selectedFlowNodes, selectedNode, dispatch);
};

function HandleBlockNodeSelect(flowNode: FlowNode, selectedNode: Node, dispatch: Dispatch) {
  if (flowNode.id !== selectedNode?.id) {
    dispatch(removeActiveBlockNode());
    dispatch(setActiveBlockNode(flowNode.id));
    dispatch(removeActiveEdge());
    OpenInspector(dispatch);
  }
}

function HandleBlockEdgeSelect(flowEdge: FlowEdge, dispatch: Dispatch) {
  dispatch(removeActiveBlockNode());
  dispatch(setActiveEdge(flowEdge.id, true));
  OpenInspector(dispatch);
}

function HandleMultiSelect(flowNodes: FlowNode[], selectedNode: Node, dispatch: Dispatch) {
  let isSelected = false;
  flowNodes.forEach((n) => {
    if (n.id === selectedNode.id) isSelected = true;
  });

  if (isSelected) return;
  dispatch(removeActiveBlockNode());
  dispatch(removeActiveEdge());
}

function HandleNoSelect(inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  dispatch(removeActiveBlockNode());
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
