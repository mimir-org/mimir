import { MutableRefObject } from "react";
import { Node as FlowNode, Edge as FlowEdge, OnSelectionChangeParams } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { Node } from "../../../../models";
import { MODULE_TYPE } from "../../../../models/project";
import { SetPanelHeight } from "../../../../modules/inspector/helpers/SetPanelHeight";
import { changeInspectorHeight } from "../../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../../redux/store/modules/modulesSlice";
import { removeActiveEdge, removeActiveNode, setActiveNode, setActiveEdge } from "../../../../redux/store/project/actions";

/**
 * Component to handle selection of Nodes in BlockView.
 * A difference between TreeView and BlockView is that in TreeView the SelectedNode is displayed in the Inspector.
 * In BlockView the SelectedBlockNode is displayed.
 * The SelectedNode in BlockView is the large ParentNode, and the SelectedBlockNode is the child node that is clicked.
 * @param selectedItems
 * @param selectedBlockNode
 * @param inspectorRef
 * @param dispatch
 */
export const OnBlockSelectionChange = (
  selectedItems: OnSelectionChangeParams,
  selectedBlockNode: Node,
  inspectorRef: MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  const selectedFlowNodes = selectedItems.nodes.filter((n) => n.id !== selectedBlockNode?.id);
  const selectedFlowEdges = selectedItems.edges;

  if (!selectedFlowNodes.length && !selectedFlowEdges.length) return HandleNoSelect(inspectorRef, dispatch);
  if (selectedFlowEdges.length === 1) return HandleBlockEdgeSelect(selectedFlowEdges[0], dispatch);
  return HandleBlockNodeSelect(selectedFlowNodes[0], dispatch);
};

function HandleBlockNodeSelect(flowNode: FlowNode, dispatch: Dispatch) {
  if (!flowNode) return;
  dispatch(removeActiveNode());
  dispatch(setActiveNode(flowNode.id));
  flowNode.selected = true;
}

function HandleBlockEdgeSelect(flowEdge: FlowEdge, dispatch: Dispatch) {
  dispatch(removeActiveNode());
  dispatch(setActiveEdge(flowEdge.id, true));
}

function HandleNoSelect(inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  // dispatch(removeActiveNode());
  dispatch(removeActiveEdge());
  CloseInspector(inspectorRef, dispatch);
}

export function CloseInspector(inspectorRef: React.MutableRefObject<HTMLDivElement>, dispatch: Dispatch) {
  dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
  dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
  SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);
}
