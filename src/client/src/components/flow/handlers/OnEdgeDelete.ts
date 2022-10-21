import { Dispatch } from "redux";
import { Edge, Project } from "@mimirorg/modelbuilder-types";
import { CloseInspector } from "../tree/handlers";
import { ResolveSubStreams } from "../block/hooks/helpers/ProxyTerminals";

/**
 * Component that runs when an edge is deleted from Mimir. This component is used both in TreeView and BlockView.
 * An edge can be deleted with the delete key from the keyboard, or the delete button in Mimir's Inspector.
 * @param edgesToDelete
 * @param inspectorRef
 * @param project
 * @param dispatch
 */
const OnEdgeDelete = (
  edgesToDelete: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) => {
  edgesToDelete.forEach((edge) => {
    if (!edge) return;
    ResolveSubStreams(project, dispatch, edge, null);
  });

  CloseInspector(inspectorRef, dispatch);
};

export default OnEdgeDelete;
