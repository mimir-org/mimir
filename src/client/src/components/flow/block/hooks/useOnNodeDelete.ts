import { Node as FlowNode } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Node, Edge, Project } from "../../../../models";
import { removeEdge, removeNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { HandleOffPageDelete } from "../nodes/blockOffPageNode/helpers";
import { FindMimirNodeByFlowNodeId } from "../../helpers";
import { IsAspectNode, IsOffPage } from "../../../../helpers/Aspects";
import { CloseInspector } from "../../handlers";
import { GetParentConnector } from "../nodes/blockOffPageNode/helpers/HandleOffPageDelete";
import { IsOffPageEdge } from "../helpers";
import { IsPartOfTerminal } from "../../helpers/Connectors";
import { GetParent } from "../../../../helpers/Family";

/**
 * Hook that runs when a node is deleted from Mimir in BlockView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted, except an edge between OffPageNodes.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param flowNodesToDelete
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const useOnNodeDelete = (
  flowNodesToDelete: FlowNode[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  HandleDeleteNodes(flowNodesToDelete, project, dispatch);
  CloseInspector(inspectorRef, dispatch);
};

function HandleDeleteNodes(flowNodes: FlowNode[], project: Project, dispatch: Dispatch) {
  flowNodes.forEach((flowNode) => {
    if (IsAspectNode(flowNode.data)) return;

    const node = FindMimirNodeByFlowNodeId(project, flowNode);
    if (node?.isLocked) return;

    DeleteRelatedEdges(node, project, dispatch);

    IsOffPage(node) ? HandleOffPageDelete(project, node, dispatch) : HandleRelatedEdges(node, project, dispatch);
    dispatch(removeNode(flowNode.id));
  });
}

/**
 * Function to delete all edges related to a node that is to be deleted.
 * Note: the edges must be deleted before the node.
 * @param node
 * @param project
 * @param dispatch
 */
function DeleteRelatedEdges(node: Node, project: Project, dispatch: Dispatch) {
  project.edges.forEach((edge) => {
    if (edge.fromNodeId === node.id || edge.toNodeId === node.id) dispatch(removeEdge(edge.id));
  });
}

function HandleRelatedEdges(nodeToRemove: Node, project: Project, dispatch: Dispatch) {
  project.edges?.forEach((edge) => {
    const isRelated = edge.fromNodeId === nodeToRemove.id || edge.toNodeId === nodeToRemove.id;
    if (!isRelated) return;

    HandleConnectedOffPageElements(project, edge, dispatch);
    const node = project.nodes.find((n) => n.id === edge.toNodeId);
    if (!node?.isLocked) dispatch(removeEdge(edge.id));
  });
}

function HandleConnectedOffPageElements(project: Project, elementEdge: Edge, dispatch: Dispatch) {
  if (!elementEdge) return;

  const nodes = project.nodes;
  const edges = project.edges;

  nodes.forEach((node) => {
    const hasRelatedOffPageNode = IsOffPage(node) && node?.id === elementEdge.fromNodeId;
    if (!hasRelatedOffPageNode) return;

    const transportEdge = project.edges.find(
      (x) =>
        IsOffPageEdge(x) &&
        (x?.toConnectorId === elementEdge?.toConnectorId || x?.fromConnectorId === elementEdge?.fromConnectorId)
    );

    if (!transportEdge) return;

    const partOfTerminal = node?.connectors?.find((c) => IsPartOfTerminal(c));
    const partOfEdge = edges.find((x) => IsOffPage(x.toNode) && x.toNodeId === node.id && x.toConnectorId === partOfTerminal?.id);

    const parentNode = GetParent(node);
    const parentNodeConn = GetParentConnector(transportEdge, node);

    dispatch(setOffPageStatus(parentNode?.id, parentNodeConn?.id, false));
    dispatch(removeEdge(transportEdge?.id));
    dispatch(removeEdge(partOfEdge?.id));
    dispatch(removeNode(node.id));
  });
}

export default useOnNodeDelete;
