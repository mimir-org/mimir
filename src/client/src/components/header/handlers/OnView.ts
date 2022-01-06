import { ViewType, VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/flowSlice";
import { removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { GetSelectedNode } from "../../../helpers";
import { updateBlockElements } from "../../../modules/explorer/redux/actions";
import { setValidation } from "../../../redux/store/validation/actions";
import { TextResources } from "../../../assets/text";
import { Project } from "../../../models";

const OnView = (project: Project, view: ViewType, dispatch: any) => {
  const selectedNode = GetSelectedNode();

  if (view === VIEW_TYPE.BLOCKVIEW && !project) {
    dispatch(setValidation(false, TextResources.Validation_BlockView_Project));
    return;
  }

  // BlockView can only be opened when a node is selected
  if (view === VIEW_TYPE.BLOCKVIEW && !selectedNode) {
    dispatch(setValidation(false, TextResources.Validation_BlockView));
    return;
  }

  dispatch(removeSecondaryNode());
  dispatch(updateBlockElements([]));
  dispatch(changeFlowView(view));
};

export default OnView;
