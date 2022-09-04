import { MutableRefObject } from "react";
import { applyNodeChanges, NodeChange, Node as FlowNode, NodeRemoveChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../helpers/Aspects";
import { Node, Edge } from "@mimirorg/modelbuilder-types";
import { OnNodeDelete } from "../../handlers/";

/**
 * Hook that runs whenever a Node has a change in TreeView.
 * In the Flow Library a change is defined by the following types:
 * NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange | NodeResetChange
 * If a node is marked as removed, HandleRemove validates the changes and the component OnNodeDelete handles the removal.
 * The other types of changes are executed automatically by the Flow Library.
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
  inspectorRef: MutableRefObject<HTMLDivElement>
) => {
  const verifiedFlowChanges = [] as NodeChange[];
  const nodesToDelete = [] as Node[];

  // Verify changes
  changes.forEach((change) => {
    if (change.type === "remove") return HandleRemove(change, verifiedFlowChanges, nodesToDelete, nodes);
    verifiedFlowChanges.push(change);
  });

  // Execute verified changes
  if (nodesToDelete.length) OnNodeDelete(nodesToDelete, nodes, edges, inspectorRef, dispatch);
  setNodes((n) => applyNodeChanges(changes, n));
};

/**
 * Function to handle removal of a node. This function handles FlowNodes and MimirNodes separately.
 * A confirmed element to be deleted is added to both lists - verifiedFlowChanges and nodesToDelete.
 * @param change
 * @param verifiedFlowChanges
 * @param nodesToDelete
 * @param nodes
 */
function HandleRemove(change: NodeRemoveChange, verifiedFlowChanges: NodeChange[], nodesToDelete: Node[], nodes: Node[]) {
  const mimirNode = nodes?.find((n) => n.id === change.id);
  if (!mimirNode || IsAspectNode(mimirNode) || mimirNode.isLocked) return;

  nodesToDelete.push(mimirNode);

  const removeChange = { id: change.id, type: "remove" } as NodeChange;
  verifiedFlowChanges.push(removeChange);
}

export default useOnTreeNodesChange;
