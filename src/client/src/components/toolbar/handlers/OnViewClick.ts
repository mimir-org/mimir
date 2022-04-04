import { VIEW_TYPE, ViewType } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/flowSlice";
import { removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { GetSelectedNode } from "../../../helpers";
import { updateBlockElements } from "../../../modules/explorer/redux/actions";
import { setValidation } from "../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../assets/text/TextResources";
import { Dispatch } from "redux";
import { Node } from "../../../models";

const OnViewClick = (view: ViewType, numberOfSelectedElements: number, dispatch: Dispatch) => {
  const selectedNode = GetSelectedNode();
  if (!ValidateBlockViewClick(view, selectedNode, numberOfSelectedElements, dispatch)) return;

  dispatch(removeSecondaryNode());
  dispatch(updateBlockElements([]));
  dispatch(changeFlowView(view));
};

export default OnViewClick;

function ValidateBlockViewClick(view: ViewType, selectedNode: Node, numberOfSelectedElements: number, dispatch: Dispatch) {
  // BlockView can not be opened if multiple nodes are selected
  if (view === VIEW_TYPE.BLOCKVIEW && numberOfSelectedElements > 1) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_BLOCKVIEW_MULTISELECT }));
    return false;
  }

  // BlockView can only be opened when a node is selected
  if (view === VIEW_TYPE.BLOCKVIEW && !selectedNode) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_BLOCKVIEW }));
    return false;
  }

  return true;
}
