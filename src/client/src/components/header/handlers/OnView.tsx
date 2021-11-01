import { ViewType, VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { removeSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { GetSelectedNode } from "../../flow/helpers";

const OnView = (view: ViewType, dispatch: any) => {
  const selectedNode = GetSelectedNode();

  // BlockView can only be opened when a node is selected
  if (view === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;

  dispatch(removeSecondaryNode());
  dispatch(changeFlowView(view));
};

export default OnView;
