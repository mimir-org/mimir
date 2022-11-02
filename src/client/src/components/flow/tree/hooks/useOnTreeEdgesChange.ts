import { applyEdgeChanges, EdgeChange, Edge as FlowEdge, NodeRemoveChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Node, Edge, Project } from "@mimirorg/modelbuilder-types";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { OnEdgeDelete } from "../../handlers/";

/**
 * Hook that runs whenever an Edge has a change in TreeView.
 * In the Flow Library a change is defined by the following types:
 * EdgeSelectionChange | EdgeRemoveChange | EdgeAddChange | EdgeResetChange
 * If an edge is marked as removed, HandleRemove validates the changes and the component OnEdgeDelete handles the removal.
 * The other types of changes are executed automatically.
 * @param nodes
 * @param edges
 * @param selectedNode
 * @param changes
 * @param setEdges
 * @param inspectorRef
 * @param project
 * @param dispatch
 */

const useOnTreeEdgesChange = (
  nodes: Node[],
  edges: Edge[],
  selectedNode: Node,
  changes: EdgeChange[],
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>,
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  const verifiedFlowChanges = [] as EdgeChange[];
  const edgesToDelete = [] as Edge[];

  // Verify changes
  changes.forEach((change) => {
    if (change.type === "remove") return HandleRemove(change, verifiedFlowChanges, edgesToDelete, nodes, edges, selectedNode);
    verifiedFlowChanges.push(change);
  });

  // Execute verified changes
  if (edgesToDelete.length) OnEdgeDelete(edgesToDelete, inspectorRef, project, dispatch);
  setEdges((e) => applyEdgeChanges(verifiedFlowChanges, e));
};

/**
 * Function to handle removal of an edge. This function handles FlowEdges and MimirEdges separately.
 * A confirmed element to be deleted is added to both lists - verifiedFlowChanges and edgesToDelete.
 * @param change
 * @param verifiedFlowChanges
 * @param edgesToDelete
 * @param nodes
 * @param edges
 * @param selectedNode
 */
function HandleRemove(
  change: NodeRemoveChange,
  verifiedFlowChanges: EdgeChange[],
  edgesToDelete: Edge[],
  nodes: Node[],
  edges: Edge[],
  selectedNode: Node
) {
  if (IsAspectNode(selectedNode)) return;

  const mimirEdge = edges?.find((n) => n.id === change.id);
  if (!mimirEdge || mimirEdge.isLocked) return;

  const fromNode = nodes.find((n) => n.id === mimirEdge.fromNodeId);
  const toNode = nodes.find((n) => n.id === mimirEdge.toNodeId);
  if (fromNode?.isLocked || toNode?.isLocked) return;

  edgesToDelete.push(mimirEdge);

  const removeChange = { id: change.id, type: "remove" } as EdgeChange;
  verifiedFlowChanges.push(removeChange);
}

export default useOnTreeEdgesChange;
