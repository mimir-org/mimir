import { Edge } from "../../../../../models";
import { changeInspectorTab } from "../../../redux/tabs/actions";
import { setActiveEdge, setActiveNode } from "../../../../../redux/store/project/actions";

const OnClickTransport = (edge: Edge, dispatch: any) => {
  dispatch(setActiveEdge(edge.id, true));
  dispatch(setActiveNode(null, false));
  dispatch(changeInspectorTab(3));
};

export { OnClickTransport };
