import { InspectorElement } from "../../../types";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import { OnNodeDelete, OnEdgeDelete } from "../../../../../components/flow/handlers";
import { AspectObject, Connection, Project } from "lib";

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
  if (element instanceof AspectObject) return HandleInspectorNodeDelete(element, nodes, edges, inspectorRef, dispatch);
  if (element instanceof Connection) return HandleInspectorEdgeDelete(element, nodes, edges, inspectorRef, project, dispatch);
};

function HandleInspectorNodeDelete(
  node: AspectObject,
  nodes: AspectObject[],
  edges: Connection[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) {
  const nodesToDelete = [] as AspectObject[];

  if (!IsAspectNode(node) && !node.isLocked) {
    nodesToDelete.push(node);
    // UpdateSiblingIndexOnNodeDelete(node?.id, nodes, edges, dispatch);
  }

  OnNodeDelete(nodesToDelete, nodes, edges, inspectorRef, dispatch);
}

function HandleInspectorEdgeDelete(
  edge: Connection,
  nodes: AspectObject[],
  edges: Connection[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) {
  const edgesToDelete = [] as Connection[];

  // TODO: resolve this
  // if (!edge.isLocked) {
  //   if (IsPartOfRelation(edge.fromConnector)) UpdateSiblingIndexOnEdgeDelete(edge, nodes, edges, dispatch);
  //   edgesToDelete.push(edge);
  // }

  OnEdgeDelete(edgesToDelete, inspectorRef, project, dispatch);
}
