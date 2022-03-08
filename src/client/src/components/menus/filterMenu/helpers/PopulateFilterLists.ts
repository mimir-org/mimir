import { Connector, Edge } from "../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../../flow/helpers";
import {
  ValidateFulfilledByItem,
  ValidatePartOfItem,
  ValidateRelationItem,
  ValidateTransportItem,
} from "../components/filters/helpers";

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
  edges.forEach((e) => {
    const sourceConn = e.fromConnector;

    if (IsTransport(sourceConn)) ValidateTransportItem(transportItems, sourceConn);
    if (IsLocationTerminal(sourceConn)) ValidateRelationItem(relationItems, sourceConn);
    if (IsProductTerminal(sourceConn)) ValidateFulfilledByItem(relationItems, sourceConn);
    if (IsPartOf(sourceConn)) ValidatePartOfItem(partOfItems, sourceConn);
  });
};
