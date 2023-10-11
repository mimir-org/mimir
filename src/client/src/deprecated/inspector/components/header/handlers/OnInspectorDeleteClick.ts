import { InspectorElement } from "../../../types";
import { Dispatch } from "redux";
import { AspectObject, Connection, Project } from "lib";
import { onEdgesDelete, onNodesDelete } from "components/handlers/ProjectHandlers";

/**
 * Component to handle delete clicks coming from the Inspector delete button.
 * @param nodes
 * @param edges
 * @param element
 * @param dispatch
 * @param project
 * @param inspectorRef
 */
export const OnInspectorDeleteClick = (
  nodes: AspectObject[],
  edges: Connection[],
  element: InspectorElement,
  dispatch: Dispatch,
  project: Project,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  if (element instanceof AspectObject) return HandleInspectorNodeDelete(element, nodes, edges, inspectorRef, project, dispatch);
  if (element instanceof Connection) return HandleInspectorEdgeDelete(element, nodes, edges, inspectorRef, project, dispatch);
};

function HandleInspectorNodeDelete(
  node: AspectObject,
  nodes: AspectObject[],
  edges: Connection[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) {
  const nodesToDelete = [] as AspectObject[];

  if (!node.isRoot() && !node.isLocked) {
    nodesToDelete.push(node);
    // UpdateSiblingIndexOnNodeDelete(node?.id, nodes, edges, dispatch);
  }
  const ids = nodesToDelete.map((x) => x.id);
  onNodesDelete(ids, project, dispatch);
}

function HandleInspectorEdgeDelete(
  edge: Connection,
  nodes: AspectObject[],
  edges: Connection[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) {
  const ids = edges.map((x) => x.id);
  // TODO: resolve this
  // if (!edge.isLocked) {
  //   if (IsPartOfRelation(edge.fromConnector)) UpdateSiblingIndexOnEdgeDelete(edge, nodes, edges, dispatch);
  //   edgesToDelete.push(edge);
  // }
  onEdgesDelete(ids, project, dispatch);
}
