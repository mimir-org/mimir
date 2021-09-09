import { VIEW_TYPE } from "../../../models/project";
import { changeFlowView } from "../../../redux/store/flow/actions";
import { GetSelectedNode } from "../../flow/helpers/common";

const OnViewClick = (e: any, dispatch: any, push) => {
  const selectedNode = GetSelectedNode();

  if (e.target.alt === VIEW_TYPE.BLOCKVIEW && !selectedNode) return;

  const view = e.target.alt;
  dispatch(changeFlowView(view));
  push(`/home/${view}`);
};

export default OnViewClick;
