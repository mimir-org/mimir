import { Dispatch } from "redux";
import { Node, Edge } from "../../../models";
import { deleteEdge } from "../../../redux/store/project/actions";
import { CloseInspector } from "../tree/handlers";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";

/**
 * Hook that runs when an edge is deleted from Mimir. This hook is used both in TreeView and BlockView.
 * An edge can be deleted with the delete button from a keyboard, or the delete button in Mimir's Inspector.
 * @param edgesToDelete
 * @param nodes
 * @param edges
 * @param inspectorRef
 * @param dispatch
 */
export const useOnEdgeDelete = (
  edgesToDelete: Edge[],
  nodes: Node[],
  edges: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  if (!edgesToDelete.length) return;

  edgesToDelete.forEach((edge) => {
    HandleOffPageEdgeDelete(edge, nodes, edges, dispatch);
    dispatch(deleteEdge(edge.id));
  });

  CloseInspector(inspectorRef, dispatch);
};
