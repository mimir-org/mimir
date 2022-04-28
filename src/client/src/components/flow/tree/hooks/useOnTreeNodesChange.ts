import { applyNodeChanges, NodeChange, Node as FlowNode, NodeRemoveChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { Node, Edge } from "../../../../models";
import { useOnNodeDelete } from "../../hooks/useOnNodeDelete";

/**
 * Hook that runs whenever a Node has a change in TreeView.
 * In the Flow Library a change is defined by the following types:
 * NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange | NodeResetChange
 * If a node is marked as removed, the function DeleteMimirNodes runs and handles removal of Mimir nodes and edges.
 * @param nodes
 * @param edges
 * @param changes
 * @param setNodes
 * @param dispatch
 * @param inspectorRef
 */
const useOnTreeNodesChange = (
  nodes: Node[],
  edges: Edge[],
  changes: NodeChange[],
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>,
  dispatch: Dispatch,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  const verifiedFlowChanges = [] as NodeChange[];
  const verifiedMimirNodes = [] as Node[];

  // Verify changes
  changes.forEach((change) => {
    if (change.type === "remove") return HandleRemoveChange(change, verifiedFlowChanges, verifiedMimirNodes, nodes);
    verifiedFlowChanges.push(change);
  });

  // Execute all changes
  setNodes((n) => applyNodeChanges(changes, n));
  useOnNodeDelete(verifiedMimirNodes, nodes, edges, inspectorRef, dispatch);
};

/**
 * Function to handle removal of a node. This function handles FlowNodes and MimirNodes separately.
 * A confirmed element to be deleted is added to both lists - flowChanges and mimirNodesToDelete.
 * @param change
 * @param verifiedChanges
 * @param verifiedMimirNodes
 * @param nodes
 */
function HandleRemoveChange(change: NodeRemoveChange, verifiedChanges: NodeChange[], verifiedMimirNodes: Node[], nodes: Node[]) {
  const mimirNode = nodes?.find((n) => n.id === change.id);
  if (!mimirNode || IsAspectNode(mimirNode) || mimirNode.isLocked) return;

  verifiedMimirNodes.push(mimirNode);

  const removeChange = { id: change.id, type: "remove" } as NodeChange;
  verifiedChanges.push(removeChange);
}

export default useOnTreeNodesChange;
