import { VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { setSplitNode, setSplitView } from "../../../redux/store/splitView/actions";
import { GetSelectedNode } from "../../flow/helpers";

const OnView = (e: any, dispatch: any, push) => {
  const selectedNode = GetSelectedNode();

  // Block View can only be opened when a node is selected
  if (e.target.alt === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;

  const view = e.target.alt;
  dispatch(changeFlowView(view));
  dispatch(setSplitNode(null));
  dispatch(setSplitView(false));

  push(`/home/${view}`);
};

export default OnView;
