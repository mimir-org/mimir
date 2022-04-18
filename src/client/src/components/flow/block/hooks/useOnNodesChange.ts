import { applyNodeChanges, NodeChange, NodePositionChange, Node as FlowNode } from "react-flow-renderer";
import { Size } from "../../../../compLibrary/size/Size";
import { GetParentNode } from "../../../../helpers/Family";
import { Project, Node } from "../../../../models";

/**
 * Hook that runs whenever a Node has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange | NodeResetChange
 * @param project
 * @param selectedNode
 * @param changes
 * @param setNodes
 */
const useOnNodesChange = (
  project: Project,
  selectedNode: Node,
  changes: NodeChange[],
  setNodes: React.Dispatch<React.SetStateAction<FlowNode[]>>
) => {
  if (!selectedNode) return;
  const filteredList = [] as NodeChange[];

  changes.forEach((c) => {
    if (c.type === "position") {
      if (c.id !== selectedNode?.id) filteredList.push(c);
    }
  });

  // Guard to check if a changed position is valid
  if (IsPositionChange(filteredList) && !ValidateNodePosition(filteredList as NodePositionChange[], project)) return;

  // Execute all changes
  setNodes((n) => applyNodeChanges(filteredList, n));
};

/**
 * Function to validate that a Node's position is not outside the boundary of its ParentNode in BlockView.
 * @param changes
 * @param project
 * @returns a boolean value.
 */
function ValidateNodePosition(changes: NodePositionChange[], project: Project) {
  const nodeId = changes[0].id;
  const position = changes[0].position;
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

function IsPositionChange(changes: NodeChange[]) {
  return changes[0]?.type === "position";
}

export default useOnNodesChange;
