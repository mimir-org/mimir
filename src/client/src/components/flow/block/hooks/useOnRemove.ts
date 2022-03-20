import { Elements, removeElements } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Edge, Project } from "../../../../models";
import { EDGE_TYPE } from "../../../../models/project";
import { removeEdge, removeNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { HandleOffPageDelete } from "../../block/nodes/blockOffPageNode/helpers";
import { FindProjectEdgeByElementId, FindProjectNodeByElementId, GetParent, IsElementEdge, IsPartOf } from "../../helpers";
import { GetSelectedBlockNode, IsAspectNode, IsOffPage } from "../../../../helpers";
import { GetParentConnector } from "../../block/nodes/blockOffPageNode/helpers/HandleOffPageDelete";
import { CloseInspector } from "../../handlers";

/**
 * Hook that runs when an element is deleted from Mimir in BlockView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted, except an edge between OffPageNodes.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param elements
 * @param blockEdgesToRemove
 * @param inspectorRef
 * @param project
 * @param setElements
 * @param dispatch
 */
const useOnRemove = (
  elements: Elements,
  blockEdgesToRemove: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  setElements: React.Dispatch<React.SetStateAction<Elements>>,
  dispatch: Dispatch
) => {
  const elementsToRemove: Elements = [];

  HandleDeleteElements(elements, elementsToRemove, project, dispatch);
  HandleBlockEdges(blockEdgesToRemove, project, dispatch);

  if (elementsToRemove.length) {
    CloseInspector(inspectorRef, dispatch);
    return setElements((els) => removeElements(elementsToRemove, els));
  }
};

function HandleDeleteElements(elements: Elements, elementsToRemove: Elements, project: Project, dispatch: Dispatch) {
  const selectedNode = GetSelectedBlockNode();
  const edgeTypes = Object.values(EDGE_TYPE);

  elements.forEach((elem) => {
    if (IsAspectNode(elem.data)) return;
    const isEdge = IsElementEdge(edgeTypes, elem);

    if (isEdge) {
      if (!IsAspectNode(selectedNode) && !FindProjectEdgeByElementId(project, elem)?.isLocked) {
        HandleRelatedOffPageElements(project, elem?.data?.edge, dispatch);
        dispatch(removeEdge(elem.id));
        elementsToRemove.push(elem);
      }
    } else {
      const node = FindProjectNodeByElementId(project, elem);
      if (!node?.isLocked) {
        if (IsOffPage(node)) HandleOffPageDelete(project, node, dispatch);
        dispatch(removeNode(elem.id));
        elementsToRemove.push(elem);
      }
    }
  });
}

function HandleBlockEdges(edgesToRemove: Edge[], project: Project, dispatch: Dispatch) {
  if (edgesToRemove.length) {
    edgesToRemove.forEach((edge) => {
      HandleRelatedOffPageElements(project, edge, dispatch);
      const node = project.nodes.find((n) => n.id === edge.toNodeId);
      if (!node?.isLocked) dispatch(removeEdge(edge.id));
    });
  }
}

function HandleRelatedOffPageElements(project: Project, edge: Edge, dispatch: Dispatch) {
  project.nodes.forEach((node) => {
    const isOffPageElement = IsOffPage(node) && (node?.id === edge?.fromNodeId || node?.id === edge?.toNodeId);

    if (isOffPageElement) {
      const transportEdge = project.edges.find(
        (x) =>
          (IsOffPage(x?.fromNode) || IsOffPage(x?.toNode)) &&
          (x?.toConnectorId === edge?.toConnectorId || x?.fromConnectorId === edge?.fromConnectorId)
      );

      if (!transportEdge) return;

      const partOfTerminal = node?.connectors?.find((c) => IsPartOf(c));
      const partOfEdge = project.edges.find(
        (x) => IsOffPage(x.toNode) && x.toNodeId === node.id && x.toConnectorId === partOfTerminal?.id
      );

      const parentNode = GetParent(node);
      const parentNodeConnector = GetParentConnector(transportEdge, node);
      const parentConnectorIsRequired = false;

      dispatch(setOffPageStatus(parentNode?.id, parentNodeConnector?.id, parentConnectorIsRequired));
      dispatch(removeEdge(transportEdge?.id));
      dispatch(removeEdge(partOfEdge?.id));
      dispatch(removeNode(node.id));
    }
  });
}

export default useOnRemove;
