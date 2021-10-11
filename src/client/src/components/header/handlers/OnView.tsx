import { VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { setSplitParentNode, setSplitView } from "../../../redux/store/splitView/actions";
import { GetSelectedNode } from "../../flow/helpers";

const OnView = (e: any, dispatch: any, push) => {
  const selectedNode = GetSelectedNode();
  const view = e.target.alt;

  // BlockView can only be opened when a node is selected
  if (view === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;

  dispatch(changeFlowView(view));
  dispatch(setSplitParentNode(null));
  dispatch(setSplitView(false));

  push(`/home/${view}`);
};

export default OnView;
