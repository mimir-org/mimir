import { changeInspectorTab } from "../../../../modules/inspector/redux/actions";
import { Project } from "../../../../models";
import { setModuleVisibility } from "../../../../redux/store/modules/actions";
import { MODULE_TYPE } from "../../../../models/project";
import { SetPanelHeight } from "../../../../modules/inspector/helpers";
import { Size } from "../../../../compLibrary";
import { setActiveBlockNode, setActiveEdge } from "../../../../redux/store/project/actions";

/**
 * Component to handle clicks on the Flow component in BlockView.
 * @param e
 * @param dispatch
 * @param project
 * @returns void
 */
const OnBlockClick = (e: any, dispatch: any, project: Project) => {
  if (!project) return;

  // Close Inspector if no node/edge is selected
  if (e.target.className === "react-flow__pane") {
    console.log("tesetset");

    dispatch(setModuleVisibility(MODULE_TYPE.INSPECTOR, false, true));
    SetPanelHeight(Size.ModuleClosed);
    return;
  }

  // Handle select Edge
  if (e.target.classList.contains("react-flow__edge-path")) {
    const edge = project.edges.find((x) => x.id === e.target.id);
    dispatch(setActiveEdge(edge.id, true));
    dispatch(setActiveBlockNode(null));
    dispatch(changeInspectorTab(0));
  }
};

export default OnBlockClick;
