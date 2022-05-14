import { Connector, Edge, Node } from "../../../../models";
import { IsOffPageEdge } from "../../../flow/block/helpers/IsOffPageEdge";
import { IsLocationTerminal, IsPartOfTerminal, IsProductTerminal, IsTransport } from "../../../flow/helpers/Connectors";
import { VerifyFulfilledByItem, VerifyPartOfItem, VerifyRelationItem, VerifyTransportItem } from "../components/filters/helpers";

/**
 * Method to add content to the different categories in the Visual Filter.
 * @param edges
 * @param nodes
 * @param transportItems
 * @param relationItems
 * @param partOfItems
 */
export const PopulateFilterLists = (
  edges: Edge[],
  nodes: Node[],
  transportItems: Connector[],
  relationItems: Connector[],
  partOfItems: Connector[],
  isTreeView: boolean
) => {
  edges.forEach((edge) => {
    if (isTreeView && IsOffPageEdge(edge)) return;

    const sourceConn = edge.fromConnector;

    if (IsTransport(sourceConn)) VerifyTransportItem(transportItems, sourceConn);
    else if (IsLocationTerminal(sourceConn)) VerifyRelationItem(relationItems, sourceConn);
    else if (IsProductTerminal(sourceConn)) VerifyFulfilledByItem(relationItems, sourceConn);
    else if (IsPartOfTerminal(sourceConn)) VerifyPartOfItem(partOfItems, sourceConn, nodes);
  });
};
