import { Dispatch } from "redux";
import { Node, Project } from "../../../../models";
import { OnNodeDelete } from "../../handlers/";
import { removeSelectedEdge, removeSelectedNode, setSelectedNode } from "../../../../redux/store/project/actions";
import { ValidateNodePosition } from "./helpers/ValidateNodePosition";
import { IsFamily } from "../../../../helpers/Family";
import {
  applyNodeChanges,
  NodeChange,
  Node as FlowNode,
  NodePositionChange,
  NodeRemoveChange,
  NodeSelectionChange,
} from "react-flow-renderer";

interface OnChangeParams {
  project: Project;
  selectedNode: Node;
  selectedBlockNode: Node;
  secondaryNode: Node;
  changes: NodeChange[];
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>;
  dispatch: Dispatch;
  inspectorRef: React.MutableRefObject<HTMLDivElement>;
}

/**
 * Hook that runs whenever a Node has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange | NodeResetChange
 * If a node is marked as selected, HandleSelect dispatches the node to be selected.
 * If a node is marked with a position change, HandlePosition is called, and validates the position.
 * If a node is marked as removed, HandleRemove validates the changes and the component OnNodeDelete handles the removal.
 * The other types of changes are executed automatically.
 * The selectedBlockNode is the node marked with a full checkbox in the Explorer, this is the parentNode in BlockView.
 * The selectedNode is the node selected with the mouse cursor on the canvas.
 * The secondaryNode is the second node marked with a full checkbox in the Explorer. This is the second parentNode in BlockView.
 * @param params
 */
const useOnBlockNodesChange = (params: OnChangeParams) => {
  const { project, selectedNode, selectedBlockNode, secondaryNode, changes, setNodes, dispatch, inspectorRef } = params;
  const mimirNodes = project.nodes;
  const mimirEdges = project.edges;
  const verifiedFlowChanges = [] as NodeChange[];
  const nodesToDelete = [] as Node[];

  // Handle changes
  changes.forEach((c) => {
    if (c.type === "select") return HandleSelect(c, selectedNode, verifiedFlowChanges, dispatch);
    if (c.type === "position") return HandlePosition(c, selectedBlockNode, selectedNode, secondaryNode, verifiedFlowChanges);
    if (c.type === "remove") return HandleRemove(c, selectedBlockNode, verifiedFlowChanges, nodesToDelete, mimirNodes);
    verifiedFlowChanges.push(c);
  });

  // Execute verified changes
  if (nodesToDelete.length) OnNodeDelete(nodesToDelete, mimirNodes, mimirEdges, inspectorRef, dispatch, selectedBlockNode);
  setNodes((n) => applyNodeChanges(verifiedFlowChanges, n));
};

/**
 * Function to handle selection of a node in BlockView.
 * @param change
 * @param selectedNode
 * @param verifiedFlowChanges
 * @param dispatch
 */
function HandleSelect(change: NodeSelectionChange, selectedNode: Node, verifiedFlowChanges: NodeChange[], dispatch: Dispatch) {
  if (change.id === selectedNode?.id) return;

  dispatch(removeSelectedEdge());
  dispatch(removeSelectedNode());
  dispatch(setSelectedNode(change.id));
  verifiedFlowChanges.push(change);
}

/**
 * Function to handle position changes. A validation runs before a position change is executed.
 * @param change
 * @param selectedBlockNode
 * @param filteredList
 */
function HandlePosition(
  change: NodePositionChange,
  selectedBlockNode: Node,
  selectedNode: Node,
  secondaryNode: Node,
  filteredList: NodeChange[]
) {
  const splitView = secondaryNode != undefined;
  const parentNode = splitView && IsFamily(selectedNode, secondaryNode) ? secondaryNode : selectedBlockNode;

  if (!ValidateNodePosition(parentNode, change.id, change.position)) return;
  filteredList.push(change);
}

/**
 * Function to handle removal of a node. This function handles FlowNodes and MimirNodes separately.
 * A confirmed element to be deleted is added to both lists - verifiedFlowChanges and mimirNodesToDelete.
 * The selectedBlockNode can not be deleted from BlockView.
 * @param flowRemoveChange
 * @param selectedBlockNode
 * @param verifiedFlowChanges
 * @param mimirNodesToDelete
 */
function HandleRemove(
  flowRemoveChange: NodeRemoveChange,
  selectedBlockNode: Node,
  verifiedFlowChanges: NodeChange[],
  mimirNodesToDelete: Node[],
  mimirNodes: Node[]
) {
  if (flowRemoveChange.id === selectedBlockNode?.id) return;
  const nodeToDelete = mimirNodes.find((n) => n.id === flowRemoveChange.id);

  verifiedFlowChanges.push(flowRemoveChange);
  mimirNodesToDelete.push(nodeToDelete);
}

export default useOnBlockNodesChange;
