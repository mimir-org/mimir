import { Elements, FlowElement, removeElements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size";
import { EDGE_KIND, Project } from "../../../../models";
import { EDGE_TYPE, MODULE_TYPE } from "../../../../models/project";
import { SetPanelHeight } from "../../../../modules/inspector/helpers";
import { changeInspectorHeight } from "../../../../modules/inspector/redux/inspectorSlice";
import { setModuleVisibility } from "../../../../redux/store/modules/modulesSlice";
import { removeEdge, removeNode } from "../../../../redux/store/project/actions";
import { GetSelectedNode, IsAspectNode } from "../../../../helpers";

/**
 * Hook that runs when an element is deleted from Mimir in TreeView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted.
 * @param elements
 * @param inspectorRef
 * @param project
 * @param setElements
 * @param dispatch
 */
const useOnTreeRemove = (
  elements: Elements,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  setElements: React.Dispatch<React.SetStateAction<Elements>>,
  dispatch: Dispatch
) => {
  const elementsToRemove: Elements = [];
  elements = elements.filter((el) => !IsAspectNode(el.data));

  const hasDeletedElement = handleDeleteElements(elements, elementsToRemove, project, dispatch);

  if (hasDeletedElement) {
    dispatch(setModuleVisibility({ type: MODULE_TYPE.INSPECTOR, visible: false, animate: true }));
    SetPanelHeight(inspectorRef, Size.MODULE_CLOSED);
    dispatch(changeInspectorHeight(Size.MODULE_CLOSED));
    return setElements((els) => removeElements(elementsToRemove, els));
  }
};

const handleDeleteElements = (elements: Elements, verifiedList: Elements, project: Project, dispatch: Dispatch) => {
  const selectedNode = GetSelectedNode();
  const edgeTypes = Object.values(EDGE_TYPE);
  let hasDeletedElement = false;

  for (const elem of elements) {
    const isEdge = isElementEdge(edgeTypes, elem);

    if (isEdge) {
      if (!IsAspectNode(selectedNode) && !findProjectEdgeByElementId(project, elem)?.isLocked) {
        hasDeletedElement = true;

        dispatch(removeEdge(elem.id));
        verifiedList.push(elem);
      }
    } else {
      const node = findProjectNodeByElementId(project, elem);
      if (node?.isLocked) continue;

      hasDeletedElement = true;
      dispatch(removeNode(elem.id));
      verifiedList.push(elem);
    }
  }
  return hasDeletedElement;
};

const isElementEdge = (edgeTypes: string[], element: FlowElement) => {
  return edgeTypes.some((x) => x === element.type?.toString() || element.data?.kind === EDGE_KIND);
};

const findProjectEdgeByElementId = (project: Project, element: FlowElement) => {
  return project.edges.find((edge) => edge.id === element.id);
};

const findProjectNodeByElementId = (project: Project, element: FlowElement) => {
  return project.nodes.find((node) => node.id === element.id);
};

export default useOnTreeRemove;
