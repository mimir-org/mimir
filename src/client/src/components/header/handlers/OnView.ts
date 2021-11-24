import { ViewType } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { updateBlockElements } from "../../../modules/explorer/redux/actions";

const OnView = (view: ViewType, dispatch: any) => {
  dispatch(removeSecondaryNode());
  dispatch(updateBlockElements([]));
  dispatch(changeFlowView(view));
};

export default OnView;
