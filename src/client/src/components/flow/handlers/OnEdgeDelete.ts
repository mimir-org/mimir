import { Dispatch } from "redux";
import { Edge, Node } from "../../../models";
import { CloseInspector } from "../tree/handlers";
import { HandleOffPageEdgeDelete } from "./helpers/HandleOffPageEdgeDelete";

/**
 * Component that runs when an edge is deleted from Mimir. This component is used both in TreeView and BlockView.
 * An edge can be deleted with the delete key from the keyboard, or the delete button in Mimir's Inspector.
 * @param edgesToDelete
 * @param nodes
 * @param edges
 * @param inspectorRef
 * @param dispatch
 */
const OnEdgeDelete = (
  edgesToDelete: Edge[],
  nodes: Node[],
  edges: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) => {
  edgesToDelete.forEach((edge) => {
    if (!edge) return;
    HandleOffPageEdgeDelete(edge, nodes, edges, dispatch);
  });

  CloseInspector(inspectorRef, dispatch);
};

export default OnEdgeDelete;
