import { Node as FlowNode, Edge as FlowEdge } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Project } from "../../../../models";
import { removeEdge, removeNode } from "../../../../redux/store/project/actions";
import { GetSelectedNode, IsAspectNode } from "../../../../helpers";
import { CloseInspector } from "../../handlers";
import { FindMimirNodeByFlowNodeId, FindMimirEdgeByFlowEdgeId } from "../../helpers";

/**
 * Hook that runs when an element is deleted from Mimir in TreeView.
 * If a Node is deleted the connected Edges are also deleted.
 * If an Edge is deleted the connect Nodes will not be deleted.
 * @param flowNodes
 * @param flowEdges
 * @param inspectorRef
 * @param project
 * @param setNodes
 * @param setEdges
 * @param dispatch
 */
const useOnTreeRemove = (
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

  if (!nodesToRemove.length) return;

  CloseInspector(inspectorRef, dispatch);
  return null; //setElements((els) => removeElements(elementsToRemove, els));
};

function HandleRemoveFlowNodes(flowNodes: FlowNode[], flowNodesToRemove: FlowNode[], project: Project, dispatch: Dispatch) {
  flowNodes.forEach((flowNode) => {
    if (IsAspectNode(flowNode.data)) return;

    const node = FindMimirNodeByFlowNodeId(project, flowNode);
    if (node?.isLocked) return;

    dispatch(removeNode(flowNode.id));
    flowNodesToRemove.push(flowNode);
  });
}

function HandleRemoveFlowEdges(flowEdges: FlowEdge[], flowEdgesToRemove: FlowEdge[], project: Project, dispatch: Dispatch) {
  flowEdges.forEach((flowEdge) => {
    const selectedNode = GetSelectedNode();
    if (IsAspectNode(selectedNode)) return;

    const edge = FindMimirEdgeByFlowEdgeId(project, flowEdge);
    if (edge?.isLocked) return;

    dispatch(removeEdge(flowEdge.id));
    flowEdgesToRemove.push(flowEdge);
  });
}

export default useOnTreeRemove;
