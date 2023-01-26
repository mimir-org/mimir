import { Dispatch } from "redux";
import { updateBlockPosition, updateEdge } from "../../../../redux/store/project/actions";
import { Node as FlowNode } from "react-flow-renderer";
import { Edge } from "@mimirorg/modelbuilder-types";

/**
 * Hook that runs when a Node has been dragged and moved in the canvas of Mimir in BlockView.
 * @param node
 * @param dispatch
 */
export const useOnDragStop = (node: FlowNode, edges: Edge[], dispatch: Dispatch) => {
  dispatch(updateBlockPosition(node.id, node.position.x, node.position.y));

  const fromNodeEdges = edges.filter((e) => e.fromNodeId === node.id);
  const toNodeEdges = edges.filter((e) => e.toNodeId === node.id);

  fromNodeEdges.forEach((e) => {
    dispatch(
      updateEdge({
        ...e,
        fromNode: { ...e.fromNode, positionBlockX: node.position.x, positionBlockY: node.position.y },
      })
    );
  });

  toNodeEdges.forEach((e) => {
    dispatch(
      updateEdge({
        ...e,
        toNode: { ...e.toNode, positionBlockX: node.position.x, positionBlockY: node.position.y },
      })
    );
  });
};

export default useOnDragStop;
