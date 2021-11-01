import { MODULE_TYPE } from "../../../../../models/project";
import { setModuleVisibility } from "../../../../../redux/store/modules/actions";
import { setActiveEdge, setActiveNode } from "../../../../../redux/store/project/actions";
import { changeInspectorTab } from "../../../redux/tabs/actions";
import { Node } from "../../../../../models";

export const OnClickNode = (node: Node, dispatch: any) => {
  dispatch(setActiveEdge(null, false));
  dispatch(setActiveNode(node.id, true));
  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, true, true));
  dispatch(changeInspectorTab(3));
};
