import { changeInspectorTab } from "../../../../redux/store/inspector/actions";
import { GetSelectedNode } from "../common";
import { Project } from "../../../../models";
import {
  setActiveBlockNode,
  setActiveEdge,
} from "../../../../redux/store/project/actions";

const OnBlockClick = (e: any, dispatch: any, project: Project) => {
  if (!project) return;

  // Handle select Edge
  if (e.target.classList.contains("react-flow__edge-path")) {
    const edge = project.edges.find((x) => x.id === e.target.id);
    dispatch(setActiveEdge(edge.id, true));
    dispatch(setActiveBlockNode(null));
    dispatch(changeInspectorTab(0));
    return;
  }

  if (e.target.classList.contains("react-flow__pane")) {
    const selectedNode = GetSelectedNode();
    if (selectedNode) {
      dispatch(setActiveEdge(null, false));
      dispatch(setActiveBlockNode(selectedNode.id));
      dispatch(changeInspectorTab(0));
      return;
    }
  }
  dispatch(setActiveEdge(null, false));
};

export default OnBlockClick;
