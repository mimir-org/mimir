import { MODULE_TYPE } from "../../../../models/project";
import { changeInspectorTab } from "../../../../redux/store/inspector/actions";
import { changeModuleVisibility } from "../../../../redux/store/modules/actions";
import { FindSelectedNode } from "../common";
import {
  changeActiveEdge,
  changeActiveNode,
} from "../../../../redux/store/project/actions";

const OnTreeClick = (e, dispatch, project) => {
  if (!project) return;

  // Close Inspector if nothing is selected
  if (e.target.className === "react-flow__pane") {
    dispatch(changeModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
    // const panel = document.getElementById("InspectorModule");
    // panel.style.height = Size.ModuleClosed + "px";
    return;
  }

  // Handle select Edge
  if (e.target.classList.contains("react-flow__edge-path")) {
    const edge = project.edges.find((x) => x.id === e.target.id);
    dispatch(changeActiveEdge(edge.id, true));
    dispatch(changeActiveNode(null, false));
    dispatch(changeInspectorTab(0));
    return;
  }

  if (e.target.classList.contains("react-flow__pane")) {
    const selectedNode = FindSelectedNode();
    if (selectedNode) {
      dispatch(changeActiveEdge(null, false));
      dispatch(changeActiveNode(selectedNode.id, false));
      dispatch(changeInspectorTab(0));
      // const panel = document.getElementById("InspectorModule");
      // panel.style.height = Size.InspectorModuleOpen + "px";
      return;
    }
  }
  dispatch(changeActiveEdge(null, false));
};

export default OnTreeClick;
