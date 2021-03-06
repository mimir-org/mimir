import { Edge, Node } from "../../../../../models";
import { InspectorElement } from "../../../types";
import { IsEdge, IsNode } from "../../../helpers/IsType";
import { Dispatch } from "redux";
import { IsAspectNode } from "../../../../../helpers/Aspects";
import { UpdateSiblingIndexOnEdgeDelete, UpdateSiblingIndexOnNodeDelete } from "../../../../../components/flow/helpers";
import { IsPartOfTerminal } from "../../../../../components/flow/helpers/Connectors";
import { OnNodeDelete, OnEdgeDelete } from "../../../../../components/flow/handlers";

/**
 * Component to handle delete clicks coming from the Inspector delete button.
 * @param nodes
 * @param edges
 * @param element
 * @param dispatch
 * @param inspectorRef
 */
export const OnInspectorDeleteClick = (
  nodes: Node[],
  edges: Edge[],
  element: InspectorElement,
  dispatch: Dispatch,
  inspectorRef: React.MutableRefObject<HTMLDivElement>
) => {
  if (IsNode(element)) return HandleInspectorNodeDelete(element, nodes, edges, inspectorRef, dispatch);
  if (IsEdge(element)) return HandleInspectorEdgeDelete(element, nodes, edges, inspectorRef, dispatch);
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
    UpdateSiblingIndexOnNodeDelete(node?.id, nodes, edges, dispatch);
  }

  OnNodeDelete(nodesToDelete, nodes, edges, inspectorRef, dispatch);
}

function HandleInspectorEdgeDelete(
  edge: Edge,
  nodes: Node[],
  edges: Edge[],
  inspectorRef: React.MutableRefObject<HTMLDivElement>,
  dispatch: Dispatch
) {
  const edgesToDelete = [] as Edge[];

  if (!edge.isLocked) {
    if (IsPartOfTerminal(edge.fromConnector)) UpdateSiblingIndexOnEdgeDelete(edge, nodes, edges, dispatch);
    edgesToDelete.push(edge);
  }

  OnEdgeDelete(edgesToDelete, nodes, edges, inspectorRef, dispatch);
}
