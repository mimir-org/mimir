import { ViewType, VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { setSecondaryNode } from "../../../redux/store/secondaryNode/actions";
import { GetSelectedNode } from "../../flow/helpers";

const OnView = (view: ViewType, dispatch: any, push) => {
  const selectedNode = GetSelectedNode();

  // BlockView can only be opened when a node is selected
  if (view === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;

  dispatch(changeFlowView(view));
  dispatch(setSecondaryNode(null));

  push(`/home/${view}`);
};

export default OnView;
