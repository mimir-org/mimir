import { changeInspectorTab } from "../../../../modules/inspector/redux/tabs/actions";
import { Project } from "../../../../models";
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

  // Handle select Edge
  if (e.target.classList.contains("react-flow__edge-path")) {
    const edge = project.edges.find((x) => x.id === e.target.id);
    dispatch(setActiveEdge(edge?.id, true));
    dispatch(setActiveBlockNode(null));
    dispatch(changeInspectorTab(0));
  }
};

export default OnBlockClick;
