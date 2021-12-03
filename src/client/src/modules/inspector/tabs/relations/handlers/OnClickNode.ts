import { MODULE_TYPE } from "../../../../../models/project";
import { setModuleVisibility } from "../../../../../redux/store/modules/actions";
import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../redux/store/project/actions";
import { changeInspectorTab } from "../../../redux/tabs/actions";
import { Node } from "../../../../../models";
import { IsBlockView } from "../../../../../helpers";

export const OnClickNode = (node: Node, setActiveFlowElement: (elementId: string) => void, dispatch: any) => {
  dispatch(setActiveEdge(null, false));
  IsBlockView() ? dispatch(setActiveBlockNode(node.id)) : dispatch(setActiveNode(node.id, true));
  dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, true, true));
  dispatch(changeInspectorTab(3));
  setActiveFlowElement(node.id);
};
