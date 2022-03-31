import { Connector, Edge } from "../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../../flow/helpers";
import { VerifyFulfilledByItem, VerifyPartOfItem, VerifyRelationItem, VerifyTransportItem } from "../components/filters/helpers";

/**
 * Method to add content to the different categories in the Visual Filter.
 * @param edges
 * @param transportItems
 * @param relationItems
 * @param partOfItems
 */
export const PopulateFilterLists = (
  edges: Edge[],
  transportItems: Connector[],
  relationItems: Connector[],
  partOfItems: Connector[]
) => {
  edges.forEach((edge) => {
    const sourceConn = edge.fromConnector;

    if (IsTransport(sourceConn)) VerifyTransportItem(transportItems, sourceConn);
    if (IsLocationTerminal(sourceConn)) VerifyRelationItem(relationItems, sourceConn);
    if (IsProductTerminal(sourceConn)) VerifyFulfilledByItem(relationItems, sourceConn);
    if (IsPartOf(sourceConn)) VerifyPartOfItem(partOfItems, sourceConn);
  });
};
