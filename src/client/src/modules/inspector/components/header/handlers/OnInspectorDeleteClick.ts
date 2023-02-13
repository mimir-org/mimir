import { Node, Edge, Project } from "@mimirorg/modelbuilder-types";
import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../../../services";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import { UpdateSiblingIndexOnEdgeDelete, UpdateSiblingIndexOnNodeDelete } from "../../../../../components/flow/helpers";
import { IsPartOfRelation } from "../../../../../components/flow/helpers/Connectors";
import { OnNodeDelete, OnEdgeDelete } from "../../../../../components/flow/handlers";
import { MimirNode } from "../../../../../lib/types/Node";

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
  nodes: Node[],
  edges: Edge[],
  element: InspectorElement,
  dispatch: Dispatch,
  project: Project,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  if (IsNode(element)) return HandleInspectorNodeDelete(element, nodes, edges, inspectorRef, dispatch);
  if (IsEdge(element)) return HandleInspectorEdgeDelete(element, nodes, edges, inspectorRef, project, dispatch);
};

function HandleInspectorNodeDelete(
  node: Node,
  nodes: Node[],
  edges: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) {
  const nodesToDelete = [] as Node[];

  if (!IsAspectNode(node) && !node.isLocked) {
    nodesToDelete.push(node);
    UpdateSiblingIndexOnNodeDelete(node?.id, nodes as MimirNode[], edges, dispatch);
  }

  OnNodeDelete(nodesToDelete, nodes, edges, inspectorRef, dispatch);
}

function HandleInspectorEdgeDelete(
  edge: Edge,
  nodes: Node[],
  edges: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  project: Project,
  dispatch: Dispatch
) {
  const edgesToDelete = [] as Edge[];

  if (!edge.isLocked) {
    if (IsPartOfRelation(edge.fromConnector)) UpdateSiblingIndexOnEdgeDelete(edge, nodes as MimirNode[], edges, dispatch);
    edgesToDelete.push(edge);
  }

  OnEdgeDelete(edgesToDelete, inspectorRef, project, dispatch);
}
