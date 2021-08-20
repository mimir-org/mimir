import { changeInspectorTab } from "../../../../redux/store/inspector/actions";
import { FindSelectedNode } from "../common";
import {
  changeActiveBlockNode,
  changeActiveEdge,
} from "../../../../redux/store/project/actions";

const OnBlockClick = (e, dispatch, project) => {
  if (!project) return;

  // Handle select Edge
  if (e.target.classList.contains("react-flow__edge-path")) {
    const edge = project.edges.find((x) => x.id === e.target.id);
    dispatch(changeActiveEdge(edge.id, true));
    dispatch(changeActiveBlockNode(null));
    dispatch(changeInspectorTab(0));
    return;
  }

  if (e.target.classList.contains("react-flow__pane")) {
    const selectedNode = FindSelectedNode();
    if (selectedNode) {
      dispatch(changeActiveEdge(null, false));
      dispatch(changeActiveBlockNode(selectedNode.id));
      dispatch(changeInspectorTab(0));
      return;
    }
  }
  dispatch(changeActiveEdge(null, false));
};

export default OnBlockClick;
