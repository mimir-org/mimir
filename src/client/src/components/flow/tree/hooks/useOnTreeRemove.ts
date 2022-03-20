import { Elements, FlowElement, removeElements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { EDGE_KIND, Project } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { removeEdge, removeNode } from "../../../../redux/store/project/actions";
import { GetSelectedNode, IsAspectNode } from "../../../../helpers";
import { CloseInspector } from "../../handlers";

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

  FindElementsToRemove(elements, elementsToRemove, project, dispatch);

  if (elementsToRemove.length) {
    CloseInspector(inspectorRef, dispatch);
    return setElements((els) => removeElements(elementsToRemove, els));
  }
};

const FindElementsToRemove = (elements: Elements, elementsToRemove: Elements, project: Project, dispatch: Dispatch) => {
  const selectedNode = GetSelectedNode();
  const edgeTypes = Object.values(EDGE_TYPE);

  for (const elem of elements) {
    const isEdge = isElementEdge(edgeTypes, elem);

    if (isEdge) {
      if (!IsAspectNode(selectedNode) && !findProjectEdgeByElementId(project, elem)?.isLocked) {
        dispatch(removeEdge(elem.id));
        elementsToRemove.push(elem);
      }
    } else {
      const node = findProjectNodeByElementId(project, elem);
      if (node?.isLocked) continue;

      dispatch(removeNode(elem.id));
      elementsToRemove.push(elem);
    }
  }
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
