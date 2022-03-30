import { Node as FlowNode, Edge as FlowEdge } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Node, Edge, Project } from "../../../../models";
import { removeEdge, removeNode, setOffPageStatus } from "../../../../redux/store/project/actions";
import { HandleOffPageDelete } from "../../block/nodes/blockOffPageNode/helpers";
import { FindMimirEdgeByFlowEdgeId, FindMimirNodeByFlowNodeId, GetParent, IsPartOf } from "../../helpers";
import { GetSelectedBlockNode, IsAspectNode, IsOffPage } from "../../../../helpers";
import { CloseInspector } from "../../handlers";
import { GetParentConnector } from "../nodes/blockOffPageNode/helpers/HandleOffPageDelete";
import { IsOffPageEdge } from "../helpers";

/**
 * Hook that runs when an element is deleted from Mimir in BlockView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted, except an edge between OffPageNodes.
 * The removal of an Edge between OffPageNodes will also remove the connected Nodes.
 * @param flowNodes
 * @param flowEdges
 * @param inspectorRef
 * @param project
 * @param setNodes
 * @param setEdges
 * @param dispatch
 */
const useOnRemove = (
  flowNodes: FlowNode[],
  flowEdges: FlowEdge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  setNodes: React.Dispatch<React.SetStateAction<FlowNode<any>[]>>,
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge<any>[]>>,
  dispatch: Dispatch
) => {
  const nodesToRemove: FlowNode[] = [];
  const edgesToRemove: FlowEdge[] = [];

  HandleRemoveFlowNodes(flowNodes, nodesToRemove, project, dispatch);
  HandleRemoveFlowEdges(flowEdges, edgesToRemove, project, dispatch);
  if (!nodesToRemove.length || !edgesToRemove.length) return;

  CloseInspector(inspectorRef, dispatch);
  return null; //setElements((els) => removeElements(nodesToRemove, els));
};

function HandleRemoveFlowNodes(flowNodes: FlowNode[], nodesToRemove: FlowNode[], project: Project, dispatch: Dispatch) {
  flowNodes.forEach((flowNode) => {
    if (IsAspectNode(flowNode.data)) return;

    const node = FindMimirNodeByFlowNodeId(project, flowNode);
    if (node?.isLocked) return;

    IsOffPage(node) ? HandleOffPageDelete(project, node, dispatch) : HandleRelatedEdges(node, project, dispatch);
    dispatch(removeNode(flowNode.id));
    nodesToRemove.push(flowNode);
  });
}

function HandleRemoveFlowEdges(flowEdges: FlowEdge[], edgesToRemove: FlowEdge[], project: Project, dispatch: Dispatch) {
  flowEdges.forEach((flowEdge) => {
    const selectedNode = GetSelectedBlockNode();
    if (IsAspectNode(selectedNode)) return;

    const edge = FindMimirEdgeByFlowEdgeId(project, flowEdge);
    if (edge?.isLocked) return;

    // HandleRelatedOffPageElements(project, elem?.data?.edge, dispatch);
    dispatch(removeEdge(flowEdge.id));
    edgesToRemove.push(flowEdge);
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
