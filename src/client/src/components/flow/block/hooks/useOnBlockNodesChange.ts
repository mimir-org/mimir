import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { Node, Project } from "../../../../models";
import { OnNodeDelete } from "../../hooks/OnNodeDelete";
import { removeSelectedEdge, removeSelectedNode, setSelectedNode } from "../../../../redux/store/project/actions";
import {
  applyNodeChanges,
  NodeChange,
  Node as FlowNode,
  NodePositionChange,
  XYPosition,
  NodeRemoveChange,
  NodeSelectionChange,
} from "react-flow-renderer";

/**
 * Hook that runs whenever a Node has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange | NodeResetChange
 * If a node is marked as removed, the hook useOnNodeDelete runs and handles removal of Mimir nodes and edges.
 * If a node is marked with a position change, HandlePosition is called, and validates the position.
 * If a node is marked as selected, HandleSelect dispatches the node to be selected.
 * @param project
 * @param selectedNode
 * @param selectedBlockNode
 * @param changes
 * @param setNodes
 * @param dispatch
 * @param inspectorRef
 */
const useOnBlockNodesChange = (
  project: Project,
  selectedNode: Node,
  selectedBlockNode: Node,
  changes: NodeChange[],
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>,
  dispatch: Dispatch,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  const mimirNodes = project.nodes;
  const mimirEdges = project.edges;
  const verifiedFlowChanges = [] as NodeChange[];
  const nodesToDelete = [] as Node[];

  // Verify changes
  changes.forEach((change) => {
    if (change.type === "select") return HandleSelect(change, selectedNode, verifiedFlowChanges, dispatch);
    if (change.type === "position") return HandlePosition(change, selectedBlockNode, verifiedFlowChanges);
    if (change.type === "remove") return HandleRemove(change, selectedBlockNode, verifiedFlowChanges, nodesToDelete, mimirNodes);
    verifiedFlowChanges.push(change);
  });

  // Execute verified changes
  setNodes((n) => applyNodeChanges(verifiedFlowChanges, n));
  if (nodesToDelete.length) OnNodeDelete(nodesToDelete, mimirNodes, mimirEdges, inspectorRef, dispatch, selectedBlockNode);
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
 * Function to handle removal of a node. This function handles FlowNodes and MimirNodes separately.
 * A confirmed element to be deleted is added to both lists - flowChanges and mimirNodesToDelete.
 * The selectedBlockNode can not be deleted from BlockView.
 * @param flowChange
 * @param selectedBlockNode
 * @param verifiedFlowChanges
 * @param mimirNodesToDelete
 */
function HandleRemove(
  flowChange: NodeRemoveChange,
  selectedBlockNode: Node,
  verifiedFlowChanges: NodeChange[],
  mimirNodesToDelete: Node[],
  mimirNodes: Node[]
) {
  if (flowChange.id === selectedBlockNode?.id) return;
  const nodeToDelete = mimirNodes.find((n) => n.id === flowChange.id);

  verifiedFlowChanges.push(flowChange);
  mimirNodesToDelete.push(nodeToDelete);
}

/**
 * Function to handle position changes.
 * @param change
 * @param selectedBlockNode
 * @param filteredList
 */
function HandlePosition(change: NodePositionChange, selectedBlockNode: Node, filteredList: NodeChange[]) {
  if (!ValidateNodePosition(selectedBlockNode, change.id, change.position)) return;
  filteredList.push(change);
}

/**
 * Function to validate that a Node's position is not outside the boundary of its ParentNode in BlockView.
 * @param parentNode
 * @param id
 * @param position
 * @returns a boolean value.
 */
function ValidateNodePosition(parentNode: Node, id: string, position: XYPosition) {
  if (!parentNode || !position || id === parentNode.id) return false;

  const x = position.x;
  const y = position.y;

  const margin = 30;
  const xMin = parentNode.positionBlockX;
  const xMax = parentNode.positionBlockX + parentNode.width - Size.NODE_WIDTH;
  const yMin = margin;
  const yMax = parentNode.height - Size.NODE_HEIGHT;

  const validX = x > xMin && x < xMax;
  const validY = y > yMin && y < yMax;

  return validX && validY;
}

export default useOnBlockNodesChange;
