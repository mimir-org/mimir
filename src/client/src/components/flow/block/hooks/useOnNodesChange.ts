import { applyNodeChanges, NodeChange, Node as FlowNode, XYPosition, NodePositionChange } from "react-flow-renderer";
import { Dispatch } from "redux";
import { Size } from "../../../../compLibrary/size/Size";
import { GetParentNode } from "../../../../helpers/Family";
import { Project, Node } from "../../../../models";
import useOnNodeDelete from "./useOnNodeDelete";

/**
 * Hook that runs whenever a Node has a change in BlockView.
 * In the Flow Library a change is defined by the following types:
 * NodeDimensionChange | NodePositionChange | NodeSelectionChange | NodeRemoveChange | NodeAddChange | NodeResetChange
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
  const flowChanges: NodeChange[] = [];
  const mimirNodesToDelete: Node[] = [];

  changes.forEach((c) => {
    if (c.type === "position") {
      HandlePositionChange(c, selectedNode, project, flowChanges);
    } else if (c.type === "remove") {
      HandleRemoveNode(c.id, selectedNode, selectedBlockNode, flowChanges, mimirNodesToDelete);
    } else flowChanges.push(c);
  });

  // Execute all changes
  setNodes((n) => applyNodeChanges(flowChanges, n));
  useOnNodeDelete(mimirNodesToDelete, inspectorRef, project, dispatch);
};

/**
 * Function to handle removal of a node. This function handles FlowNodes and MimirNodes separately.
 * A confirmed element to be deleted is added to both lists - flowChanges and mimirNodesToDelete.
 * @param id
 * @param selectedNode
 * @param selectedBlockNode
 * @param flowChanges
 * @param mimirNodesToDelete
 * @returns
 */
function HandleRemoveNode(
  id: string,
  selectedNode: Node,
  selectedBlockNode: Node,
  flowChanges: NodeChange[],
  mimirNodesToDelete: Node[]
) {
  if (id !== selectedNode?.id || !selectedBlockNode) return;

  // Flow only deletes a selectedNode. In BlockView we want to delete the selectedBlockNode
  const nodeChange: NodeChange = { id: selectedBlockNode?.id, type: "remove" };

  flowChanges.push(nodeChange);
  mimirNodesToDelete.push(selectedBlockNode);
}

function HandlePositionChange(c: NodePositionChange, selectedNode: Node, project: Project, filteredList: NodeChange[]) {
  if (c.id === selectedNode.id) return;
  if (ValidateNodePosition(c.id, c.position, project)) filteredList.push(c);
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
