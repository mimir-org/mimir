import { VIEW_TYPE, ViewType } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/flowSlice";
import { removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { updateBlockNodes } from "../../../modules/explorer/redux/actions";
import { setValidation } from "../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../assets/text/TextResources";
import { Dispatch } from "redux";

const OnViewClick = (view: ViewType, numberOfSelectedElements: number, dispatch: Dispatch) => {
  if (view === VIEW_TYPE.BLOCKVIEW && !ValidateBlockViewClick(numberOfSelectedElements, dispatch)) return;

  dispatch(removeSecondaryNode());
  dispatch(updateBlockNodes([]));
  dispatch(changeFlowView(view));
};

function ValidateBlockViewClick(numberOfSelectedElements: number, dispatch: Dispatch) {
  // BlockView can not be opened if multiple nodes are selected
  if (numberOfSelectedElements > 1) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_BLOCKVIEW_MULTISELECT }));
    return false;
  }

  // BlockView can only be opened when a node is selected
  if (numberOfSelectedElements < 1) {
    dispatch(setValidation({ valid: false, message: TextResources.VALIDATION_BLOCKVIEW }));
    return false;
  }

  return true;
}

export default OnViewClick;
