import { MODULE_TYPE } from "../../../../models/project";
import { changeInspectorTab } from "../../../../modules/inspector/redux/tabs/actions";
import { setModuleVisibility } from "../../../../redux/store/modules/actions";
import { Size } from "../../../../compLibrary";
import { SetPanelHeight } from "../../../../modules/inspector/helpers";
import { Project } from "../../../../models";
import { setActiveEdge, setActiveNode } from "../../../../redux/store/project/actions";

/**
 * Component to handle clicks on the Flow component in TreeView.
 * @param e
 * @param e
 * @param dispatch
 * @param project
 * @returns void
 */
const OnTreeClick = (e: any, dispatch: any, project: Project) => {
  if (!project) return;

  // Close Inspector if no node/edge is selected
  if (e.target.className === "react-flow__pane") {
    dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
    dispatch(setActiveNode(null, false));
    dispatch(setActiveEdge(null, false));
    SetPanelHeight(Size.ModuleClosed);
    return;
  }

  // Handle select Edge
  if (e.target.classList.contains("react-flow__edge-path")) {
    const edge = project.edges.find((x) => x.id === e.target.id);
    dispatch(setActiveEdge(edge.id, true));
    dispatch(setActiveNode(null, false));
    dispatch(changeInspectorTab(0));
  }
};

export default OnTreeClick;
