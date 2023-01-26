import { Dispatch } from "redux";
import { updateEdge, updatePosition } from "../../../../redux/store/project/actions";
import { Node as FlowNode } from "react-flow-renderer";
import { Edge } from "@mimirorg/modelbuilder-types";

/**
 * Hook that runs when a Node has been dragged and moved in the canvas of Mimir in TreeView.
 * @param node
 * @param dispatch
 */
export const useOnDragStop = (node: FlowNode, edges: Edge[], dispatch: Dispatch) => {
  dispatch(updatePosition(node.id, node.position.x, node.position.y));
  const fromNodeEdges = edges.filter((e) => e.fromNodeId === node.id);
  const toNodeEdges = edges.filter((e) => e.toNodeId === node.id);

  fromNodeEdges.forEach((e) => {
    dispatch(updateEdge({ ...e, fromNode: { ...e.fromNode, positionX: node.position.x, positionY: node.position.y } }));
  });

  toNodeEdges.forEach((e) => {
    dispatch(updateEdge({ ...e, toNode: { ...e.toNode, positionX: node.position.x, positionY: node.position.y } }));
  });
};

export default useOnDragStop;
