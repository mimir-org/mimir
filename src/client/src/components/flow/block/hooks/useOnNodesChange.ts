import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { Node, Project } from "../../../../models";
import { useOnNodeDelete } from "../../hooks/useOnNodeDelete";
import {
  applyNodeChanges,
  NodeChange,
  Node as FlowNode,
  NodePositionChange,
  XYPosition,
  NodeRemoveChange,
} from "react-flow-renderer";

/**
 * Hook that runs whenever a Node has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange | NodeResetChange
 * If a node is marked as removed, the hook useOnNodeDelete runs and handles removal of Mimir nodes and edges.
 * If a node is marked with a position change, HandlePositionChange is called, and validates the position.
 * @param project
 * @param selectedBlockNode
 * @param changes
 * @param setNodes
 * @param dispatch
 * @param inspectorRef
 */
const useOnNodesChange = (
  project: Project,
  selectedBlockNode: Node,
  changes: NodeChange[],
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>,
  dispatch: Dispatch,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  const verifiedFlowChanges = [] as NodeChange[];
  const verifiedMimirNodes = [] as Node[];

  // Verify changes
  changes.forEach((c) => {
    if (c.type === "position") return HandlePosition(c, selectedBlockNode, verifiedFlowChanges);
    if (c.type === "remove") return HandleRemove(c, selectedBlockNode, verifiedFlowChanges, verifiedMimirNodes);
    verifiedFlowChanges.push(c);
  });

  // Execute all changes
  setNodes((n) => applyNodeChanges(verifiedFlowChanges, n));
  useOnNodeDelete(verifiedMimirNodes, project.nodes, project.edges, inspectorRef, dispatch, selectedBlockNode);
};

/**
 * Function to handle removal of a node. This function handles FlowNodes and MimirNodes separately.
 * A confirmed element to be deleted is added to both lists - flowChanges and mimirNodesToDelete.
 * @param change
 * @param selectedBlockNode
 * @param verifiedFlowChanges
 * @param verifiedMimirNodes
 */
function HandleRemove(
  change: NodeRemoveChange,
  selectedBlockNode: Node,
  verifiedFlowChanges: NodeChange[],
  verifiedMimirNodes: Node[]
) {
  if (change.id === selectedBlockNode?.id) return;

  verifiedFlowChanges.push(change);
  verifiedMimirNodes.push(selectedBlockNode);
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

export default useOnNodesChange;
