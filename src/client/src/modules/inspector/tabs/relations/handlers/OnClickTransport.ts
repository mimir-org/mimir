import { Edge } from "../../../../../models";
import {
  setActiveEdge,
  setActiveNode,
} from "../../../../../redux/store/project/actions";
import { changeInspectorTab } from "../../../redux/actions";

const OnClickTransport = (edge: Edge, dispatch: any) => {
  dispatch(setActiveEdge(edge.id, true));
  dispatch(setActiveNode(null, false));
  dispatch(changeInspectorTab(0));
};

export { OnClickTransport };
