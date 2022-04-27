import { Dispatch } from "redux";
import { Node, Edge } from "../../../models";
import { deleteEdge } from "../../../redux/store/project/actions";
import { CloseInspector } from "../tree/handlers";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";

export const useOnEdgeDelete = (
  edgesToDelete: Edge[],
  nodes: Node[],
  edges: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  if (!edgesToDelete.length) return;

  edgesToDelete.forEach((edge) => {
    if (edge.isLocked) return;
    HandleOffPageEdgeDelete(edge, nodes, edges, dispatch);
    dispatch(deleteEdge(edge.id));
  });

  CloseInspector(inspectorRef, dispatch);
};
