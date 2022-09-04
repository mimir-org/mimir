import { Dispatch } from "redux";
import { setEdgeVisibility } from "../../../../../../redux/store/project/actions";
import { GetConnectorNode } from "../helpers";
import { IsFamily } from "../../../../../../helpers/Family";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation, IsTerminal } from "../../../../../flow/helpers/Connectors";
import { Edge, Node } from "@mimirorg/modelbuilder-types";

/**
 * Component to toggle a specific element on/off in Visual Filter.
 * @param actualEdge
 * @param edges
 * @param nodes
 * @param dispatch
 */
export const OnFilterChange = (actualEdge: Edge, edges: Edge[], nodes: Node[], dispatch: Dispatch) => {
  const partOf = IsPartOfRelation(actualEdge.fromConnector);
  const location = IsLocationRelation(actualEdge.fromConnector);
  const fulfilledBy = IsProductRelation(actualEdge.fromConnector);
  const transport = IsTerminal(actualEdge.fromConnector);

  // Find edges to be displayed or hidden
  edges.forEach((e) => {
    // PartOf
    if (partOf && IsPartOfRelation(e.fromConnector)) {
      const source = GetConnectorNode(e.fromConnector, nodes);
      IsFamily(source, actualEdge.fromNode) && dispatch(setEdgeVisibility(e.id, !e.hidden));
    }

    // Transport
    if (transport && IsTerminal(e.fromConnector)) {
      if (IsTerminal(actualEdge.fromConnector) && e.fromConnector?.terminalTypeId === actualEdge.fromConnector?.terminalTypeId)
        dispatch(setEdgeVisibility(e.id, !e.hidden));
    }

    // Relations
    if ((location && IsLocationRelation(e.fromConnector)) || (fulfilledBy && IsProductRelation(e.fromConnector)))
      dispatch(setEdgeVisibility(e.id, !e.hidden));
  });
};
