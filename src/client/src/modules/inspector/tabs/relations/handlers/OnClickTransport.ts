import { Edge } from "../../../../../models";
import { changeInspectorTab } from "../../../redux/tabs/actions";
import { setActiveEdge, setActiveNode } from "../../../../../redux/store/project/actions";
import { Dispatch } from "redux";

const OnClickTransport = (edge: Edge, setActiveFlowElement: (elementId: string) => void, dispatch: Dispatch) => {
  dispatch(setActiveEdge(edge.id, true));
  dispatch(setActiveNode(null, false));
  dispatch(changeInspectorTab(3));
  setActiveFlowElement(edge.id);
};

export { OnClickTransport };
