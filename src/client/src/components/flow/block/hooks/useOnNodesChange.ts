import { applyNodeChanges, NodeChange, Node as FlowNode, XYPosition, NodePositionChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { GetParentNode } from "../../../../helpers/Family";
import { Project, Node } from "../../../../models";
import { useOnNodeDelete } from ".";

/**
 * Hook that runs whenever a Node has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange | NodeResetChange
 * If a node is marked as removed, the hook useOnNodeDelete runs and handles removal of Mimir nodes and edges.
 * If a node is marked with a position change, HandlePositionChange is called, and validates the position.
 * @param project
 * @param selectedNode
 * @param selectedBlockNode
 * @param changes
 * @param setNodes
 */
const useOnNodesChange = (
  project: Project,
  selectedNode: Node,
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
    if (c.type === "position") return HandlePosition(c, selectedNode, project, verifiedFlowChanges);
    if (c.type === "remove") return HandleRemove(c.id, selectedNode, selectedBlockNode, verifiedFlowChanges, verifiedMimirNodes);
    verifiedFlowChanges.push(c);
  });

  // Execute all changes
  setNodes((n) => applyNodeChanges(verifiedFlowChanges, n));
  useOnNodeDelete(verifiedMimirNodes, inspectorRef, project, dispatch);
};

/**
 * Function to handle removal of a node. This function handles FlowNodes and MimirNodes separately.
 * A confirmed element to be deleted is added to both lists - flowChanges and mimirNodesToDelete.
 * @param id
 * @param selectedNode
 * @param selectedBlockNode
 * @param verifiedFlowChanges
 * @param verifiedMimirNodes
 */
function HandleRemove(
  id: string,
  selectedNode: Node,
  selectedBlockNode: Node,
  verifiedFlowChanges: NodeChange[],
  verifiedMimirNodes: Node[]
) {
  if (id !== selectedNode?.id || !selectedBlockNode || selectedBlockNode.isLocked) return;

  // Flow only detects deletion of a selectedNode. In BlockView we want to delete the selectedBlockNode
  const nodeChange = { id: selectedBlockNode?.id, type: "remove" } as NodeChange;

  verifiedFlowChanges.push(nodeChange);
  verifiedMimirNodes.push(selectedBlockNode);
}

/**
 * Function to handle position changes.
 * @param change
 * @param selectedNode
 * @param project
 * @param filteredList
 */
function HandlePosition(change: NodePositionChange, selectedNode: Node, project: Project, filteredList: NodeChange[]) {
  if (change.id === selectedNode.id) return;
  if (ValidateNodePosition(change.id, change.position, project)) filteredList.push(change);
}

/**
 * Function to validate that a Node's position is not outside the boundary of its ParentNode in BlockView.
 * @param nodeId
 * @param position
 * @param project
 * @returns a boolean value.
 */
function ValidateNodePosition(nodeId: string, position: XYPosition, project: Project) {
  const parentNode = GetParentNode(nodeId, project);

  if (!position || !parentNode) return false;

  const x = position.x;
  const y = position.y;

  const margin = 30;
  const xMin = parentNode.positionBlockX;
  const xMax = parentNode.width - Size.NODE_WIDTH;
  const yMin = margin;
  const yMax = parentNode.height - Size.NODE_HEIGHT;

  const validX = x > xMin && x < xMax;
  const validY = y > yMin && y < yMax;

  return validX && validY;
}

export default useOnNodesChange;
