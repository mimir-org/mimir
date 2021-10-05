import { VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { GetSelectedNode } from "../../flow/helpers";

const OnViewClick = (e: any, dispatch: any, push) => {
  const selectedNode = GetSelectedNode();
  const view = e.target.alt;

  // BlockView can only be opened when a node is selected
  if (view === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;

  dispatch(changeFlowView(view));
  push(`/home/${view}`);
};

export default OnViewClick;
