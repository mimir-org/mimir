import { Elements, FlowElement, removeElements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { removeEdge, removeNode } from "../../../../redux/store/project/actions";
import { GetSelectedNode, IsAspectNode } from "../../../../helpers";
import { CloseInspector } from "../../handlers";
import { FindProjectEdgeByElementId, FindProjectNodeByElementId, IsElementEdge } from "../../helpers";

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
  const elementsToDelete = HandleDeleteElements(elements, [], project, dispatch);
  if (!elementsToDelete.length) return;

  CloseInspector(inspectorRef, dispatch);
  return setElements((els) => removeElements(elementsToDelete, els));
};

const HandleDeleteElements = (elements: Elements, elementsToDelete: Elements, project: Project, dispatch: Dispatch) => {
  elements.forEach((elem) => {
    if (IsAspectNode(elem.data)) return;
    const isEdge = IsElementEdge(Object.values(EDGE_TYPE), elem);

    isEdge
      ? HandleEdgeDelete(elem, project, elementsToDelete, dispatch)
      : HandleNodeDelete(elem, project, elementsToDelete, dispatch);
  });

  return elementsToDelete;
};

function HandleNodeDelete(elem: FlowElement, project: Project, elementsToDelete: Elements, dispatch: Dispatch) {
  const node = FindProjectNodeByElementId(project, elem);
  if (node?.isLocked) return elementsToDelete;

  dispatch(removeNode(elem.id));
  return elementsToDelete.push(elem);
}

function HandleEdgeDelete(elem: FlowElement, project: Project, elementsToDelete: Elements, dispatch: Dispatch) {
  const selectedNode = GetSelectedNode();

  if (IsAspectNode(selectedNode)) return elementsToDelete;
  const edge = FindProjectEdgeByElementId(project, elem);
  if (edge?.isLocked) return elementsToDelete;

  dispatch(removeEdge(elem.id));
  return elementsToDelete.push(elem);
}

export default useOnTreeRemove;
