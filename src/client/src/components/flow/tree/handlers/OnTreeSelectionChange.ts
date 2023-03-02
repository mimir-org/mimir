import { MutableRefObject } from "react";
import { Node as FlowNode, Edge as FlowEdge, OnSelectionChangeParams } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../assets/size/Size";
import { MODULE_TYPE } from "../../../../lib/models/project";
import { SetPanelHeight } from "../../../../modules/inspector/helpers/SetPanelHeight";
import { changeInspectorHeight } from "../../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../../redux/store/modules/modulesSlice";
import {
  removeSelectedEdge,
  removeSelectedNode,
  setSelectedEdge,
  setSelectedNode,
} from "../../../../redux/store/project/actions";

/**
 * Component to handle selection of Nodes in TreeView.
 * @param selectedItems
 * @param inspectorRef
 * @param dispatch
 */
export const HandleTreeNodeSelection = (
  selectedItems: OnSelectionChangeParams,
  inspectorRef: MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  const selectedFlowNodes = selectedItems.nodes;
  const selectedFlowEdges = selectedItems.edges;

  if (selectedFlowNodes.length === 1) return HandleNodeSelect(selectedFlowNodes[0], dispatch);
  if (selectedFlowEdges.length === 1) return HandleEdgeSelect(selectedFlowEdges[0], dispatch);
  if (!selectedFlowNodes.length && !selectedFlowEdges.length) return HandleNoSelect(inspectorRef, dispatch);
  if (selectedFlowNodes.length > 1) return HandleMultiSelect(inspectorRef, dispatch);
};

function HandleNodeSelect(flowNode: FlowNode, dispatch: Dispatch) {
  dispatch(removeSelectedEdge());
  dispatch(removeSelectedNode());
  dispatch(setSelectedNode(flowNode.id));
}

function HandleEdgeSelect(flowEdge: FlowEdge, dispatch: Dispatch) {
  dispatch(removeSelectedEdge());
  dispatch(removeSelectedNode());
  dispatch(setSelectedEdge(flowEdge?.id));
}

function HandleMultiSelect(inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  dispatch(removeSelectedEdge());
  CloseInspector(inspectorRef, dispatch);
}

function HandleNoSelect(inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  dispatch(removeSelectedNode());
  dispatch(removeSelectedEdge());
  CloseInspector(inspectorRef, dispatch);
}

export function CloseInspector(inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
  SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);
}
