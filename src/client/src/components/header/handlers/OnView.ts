import { VIEW_TYPE, ViewType } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/flowSlice";
import { removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { GetSelectedNode } from "../../../helpers";
import { updateBlockElements } from "../../../modules/explorer/redux/actions";
import { setValidation } from "../../../redux/store/validation/validationSlice";
import { TextResources } from "../../../assets/text";
import { Project } from "../../../models";
import { Dispatch } from "redux";

const OnView = (project: Project, view: ViewType, dispatch: Dispatch) => {
  const selectedNode = GetSelectedNode();

  if (view === VIEW_TYPE.BLOCKVIEW && !project) {
    dispatch(setValidation({ valid: false, message: TextResources.Validation_BlockView_Project }));
    return;
  }

  // BlockView can only be opened when a node is selected
  if (view === VIEW_TYPE.BLOCKVIEW && !selectedNode) {
    dispatch(setValidation({ valid: false, message: TextResources.Validation_BlockView }));
    return;
  }

  dispatch(removeSecondaryNode());
  dispatch(updateBlockElements([]));
  dispatch(changeFlowView(view));
};

export default OnView;
