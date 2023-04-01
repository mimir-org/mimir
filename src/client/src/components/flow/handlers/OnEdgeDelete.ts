import { Dispatch } from "redux";
import { CloseInspector } from "../tree/handlers";
import { Connection, Project } from "lib";

/**
 * Component that runs when an edge is deleted from Mimir. This component is used both in TreeView and BlockView.
 * An edge can be deleted with the delete key from the keyboard, or the delete button in Mimir's Inspector.
 * @param edgesToDelete
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const OnEdgeDelete = (
  edgesToDelete: Connection[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  edgesToDelete.forEach((edge) => {
    if (!edge) return;
    // dispatch(deleteEdge(edge.id));
    // ResolveSubStreams(project, dispatch, edge, null);
  });

  CloseInspector(inspectorRef, dispatch);
};

export default OnEdgeDelete;
