import { setActiveBlockNode, setActiveEdge, setActiveNode } from "../../../../../../redux/store/project/actions";
import { Project } from "../../../../../../models";
import { Dispatch } from "redux";
import { GetParent } from "../../../../../../helpers/Family";

const OnBlockParentClick = (dispatch: Dispatch, nodeId: string, project: Project) => {
  const parentNode = GetParent(nodeId, project);

  dispatch(setActiveEdge(null, false));
  dispatch(setActiveBlockNode(parentNode?.id));
  dispatch(setActiveNode(parentNode?.id, true));
};

export default OnBlockParentClick;
