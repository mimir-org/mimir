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
import { IsOffPageEdge } from "../helpers";
import { DoConnectorsMatch, EdgeIsConnectedToNode } from "../helpers/CheckEdgeConnections";

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

  HandleRemoveElements(elements, elementsToRemove, project, dispatch);
  HandleRelatedEdges(blockEdgesToRemove, project, dispatch);

  if (elementsToRemove.length) {
    CloseInspector(inspectorRef, dispatch);
    return setElements((els) => removeElements(elementsToRemove, els));
  }
};

function HandleRemoveElements(elements: Elements, elementsToRemove: Elements, project: Project, dispatch: Dispatch) {
  const edgeTypes = Object.values(EDGE_TYPE);

  elements.forEach((elem) => {
    if (IsAspectNode(elem.data)) return;
    const isEdge = IsElementEdge(edgeTypes, elem);

    if (isEdge) {
      const selectedNode = GetSelectedBlockNode();
      if (IsAspectNode(selectedNode)) return;

      const edge = FindProjectEdgeByElementId(project, elem);
      if (edge?.isLocked) return;

      HandleRelatedOffPageElements(project, elem?.data?.edge, dispatch);
      dispatch(removeEdge(elem.id));
      elementsToRemove.push(elem);
      return;
    }

    const node = FindProjectNodeByElementId(project, elem);
    if (node?.isLocked) return;

    if (IsOffPage(node)) HandleOffPageDelete(project, node, dispatch);
    dispatch(removeNode(elem.id));
    elementsToRemove.push(elem);
  });
}

function HandleRelatedEdges(edgesToRemove: Edge[], project: Project, dispatch: Dispatch) {
  if (!edgesToRemove.length) return;

  edgesToRemove.forEach((edge) => {
    HandleRelatedOffPageElements(project, edge, dispatch);
    const node = project.nodes.find((n) => n.id === edge.toNodeId);
    if (!node?.isLocked) dispatch(removeEdge(edge.id));
  });
}

function HandleRelatedOffPageElements(project: Project, elementEdge: Edge, dispatch: Dispatch) {
  if (!elementEdge) return;
  const nodes = project.nodes;
  const edges = project.edges;

  nodes.forEach((node) => {
    const hasRelatedOffPageNode = IsOffPage(node) && EdgeIsConnectedToNode(elementEdge, node);
    if (!hasRelatedOffPageNode) return;

    const transportEdge = edges.find((edge) => IsOffPageEdge(edge) && DoConnectorsMatch(edge, elementEdge));
    if (!transportEdge) return;

    const partOfTerminal = node?.connectors?.find((c) => IsPartOf(c));
    const partOfEdge = edges.find((x) => IsOffPage(x.toNode) && x.toNodeId === node.id && x.toConnectorId === partOfTerminal?.id);

    const parentNode = GetParent(node);
    const parentNodeConn = GetParentConnector(transportEdge, node);

    dispatch(setOffPageStatus(parentNode?.id, parentNodeConn?.id, false));
    dispatch(removeEdge(transportEdge?.id));
    dispatch(removeEdge(partOfEdge?.id));
    dispatch(removeNode(node.id));
  });
}

export default useOnRemove;
