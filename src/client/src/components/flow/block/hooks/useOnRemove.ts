import { Elements, FlowElement, removeElements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project, Node } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { removeEdge, removeNode } from "../../../../redux/store/project/actions";
import { FindProjectEdgeByElementId, FindProjectNodeByElementId, IsElementEdge } from "../../helpers";
import { GetSelectedBlockNode, IsAspectNode, IsOffPage } from "../../../../helpers";
import { CloseInspector } from "../../handlers";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";
import { HandleOffPageNodeDelete } from "./helpers/HandleOffPageNodeDelete";

/**
 * Hook that runs when an element is deleted from Mimir in BlockView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted, except an edge between OffPageNodes.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param elements
 * @param inspectorRef
 * @param project
 * @param setElements
 * @param dispatch
 */
const useOnRemove = (
  elements: Elements,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  setElements: React.Dispatch<React.SetStateAction<Elements>>,
  dispatch: Dispatch
) => {
  const verifyedElementsToDelete = HandleDeleteElements(elements, [], project, dispatch);
  if (!verifyedElementsToDelete.length) return;

  CloseInspector(inspectorRef, dispatch);
  return setElements((els) => removeElements(verifyedElementsToDelete, els));
};

function HandleDeleteElements(elements: Elements, elementsToDelete: Elements, project: Project, dispatch: Dispatch) {
  elements.forEach((elem) => {
    if (IsAspectNode(elem.data)) return;
    const isEdge = IsElementEdge(Object.values(EDGE_TYPE), elem);

    isEdge
      ? HandleEdgeDelete(elem, project, elementsToDelete, dispatch)
      : HandleNodeDelete(elem, project, elementsToDelete, dispatch);
  });

  return elementsToDelete;
}

function HandleNodeDelete(elem: FlowElement, project: Project, elementsToDelete: Elements, dispatch: Dispatch) {
  const nodeToDelete = FindProjectNodeByElementId(project, elem);
  if (nodeToDelete?.isLocked) return elementsToDelete;

  IsOffPage(nodeToDelete)
    ? HandleOffPageNodeDelete(nodeToDelete.id, project, dispatch)
    : HandleRelatedEdges(nodeToDelete, project, dispatch);

  dispatch(removeNode(elem.id));
  return elementsToDelete.push(elem);
}

function HandleEdgeDelete(elem: FlowElement, project: Project, elementsToDelete: Elements, dispatch: Dispatch) {
  const selectedNode = GetSelectedBlockNode();
  if (IsAspectNode(selectedNode)) return elementsToDelete;

  const edgeToDelete = FindProjectEdgeByElementId(project, elem);
  if (edgeToDelete?.isLocked) return elementsToDelete;

  HandleOffPageEdgeDelete(edgeToDelete, project, dispatch);
  dispatch(removeEdge(elem.id));
  return elementsToDelete.push(elem);
}

function HandleRelatedEdges(nodeToDelete: Node, project: Project, dispatch: Dispatch) {
  project.edges?.forEach((edge) => {
    const isRelated = edge.fromNodeId === nodeToDelete.id || edge.toNodeId === nodeToDelete.id;
    if (!isRelated) return;

    HandleOffPageEdgeDelete(edge, project, dispatch);

    const node = project.nodes.find((n) => n.id === edge.toNodeId);
    if (!node?.isLocked) dispatch(removeEdge(edge.id));
  });
}

export default useOnRemove;
