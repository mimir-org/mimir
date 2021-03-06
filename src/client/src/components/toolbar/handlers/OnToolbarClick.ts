import { Node as FlowNode } from "react-flow-renderer";
import { Dispatch } from "redux";
import { toggleElectroView } from "../../../redux/store/electro/electroSlice";
import { setFilterMenuVisibility } from "../../menus/projectMenu/components/subMenus/redux/menuSlice";
import { SetFitToScreen } from "../../../helpers";
import { Node } from "../../../models";
import { ViewportData, ViewType, VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/flowSlice";
import { setValidation } from "../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../assets/text/TextResources";
import { removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import {
  removeSelectedBlockNode,
  removeSelectedEdge,
  removeSelectedNode,
  setSelectedNode,
  setSelectedBlockNode,
} from "../../../redux/store/project/actions";

export const OnElectroClick = (dispatch: Dispatch) => dispatch(toggleElectroView());
export const OnFilterClick = (dispatch: Dispatch, open: boolean) => dispatch(setFilterMenuVisibility(!open));

export const OnFitToScreenClick = (isTreeView: boolean, viewportData: ViewportData, secondaryNode: Node) => {
  if (isTreeView) return;
  SetFitToScreen(viewportData, secondaryNode !== null);
};

export const OnBlockViewClick = (
  selectedFlowNodes: FlowNode[],
  viewportData: ViewportData,
  isTreeView: boolean,
  dispatch: Dispatch
) => {
  if (!isTreeView || !ValidateBlockViewClick(selectedFlowNodes.length, dispatch)) return;

  SetFitToScreen(viewportData, false);
  dispatch(removeSecondaryNode());
  dispatch(setSelectedBlockNode(selectedFlowNodes[0].id));
  dispatch(setSelectedNode(selectedFlowNodes[0].id));
  dispatch(changeFlowView(VIEW_TYPE.BLOCKVIEW as ViewType));
};

export const OnTreeViewClick = (setSelectedNodes: (nodeIds: string[]) => void, isTreeView: boolean, dispatch: Dispatch) => {
  if (isTreeView) return;

  // When opening TreeView all selectedItems are removed
  setSelectedNodes([]);
  dispatch(removeSelectedNode());
  dispatch(removeSelectedBlockNode());
  dispatch(removeSelectedEdge());
  dispatch(changeFlowView(VIEW_TYPE.TREEVIEW as ViewType));
};

function ValidateBlockViewClick(numberOfSelectedElements: number, dispatch: Dispatch) {
  // BlockView can only be opened when one node is selected
  if (numberOfSelectedElements < 1) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_BLOCKVIEW }));
    return false;
  }

  // BlockView can not be opened if multiple nodes are selected
  if (numberOfSelectedElements > 1) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_BLOCKVIEW_MULTISELECT }));
    return false;
  }

  return true;
}
