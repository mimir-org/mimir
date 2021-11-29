import { ValidateRelationItem, ValidatePartOfItem, ValidateTransportItem, ValidateFulfilledByItem, ValidateFluidItem } from ".";
import { Connector, Edge } from "../../../../models";
import { IsLocationTerminal, IsPartOf, IsTransport, IsProductTerminal } from "../../../flow/helpers";

/**
 * Method to add content to the drop-down menus in FilterMenu.
 * @param edges
 * @param transportItems
 * @param fluidItems
 * @param relationItems
 * @param partOfItems
 */
const PopulateFilterList = (
  edges: Edge[],
  transportItems: Connector[],
  fluidItems: Connector[],
  relationItems: Connector[],
  partOfItems: Connector[]
) => {
  edges.forEach((e) => {
    const sourceConn = e.fromConnector;

    if (IsTransport(sourceConn)) {
      ValidateTransportItem(transportItems, sourceConn);
      ValidateFluidItem(fluidItems, sourceConn);
    }
    if (IsLocationTerminal(sourceConn)) ValidateRelationItem(relationItems, sourceConn);
    if (IsProductTerminal(sourceConn)) ValidateFulfilledByItem(relationItems, sourceConn);
    if (IsPartOf(sourceConn)) ValidatePartOfItem(partOfItems, sourceConn);
  });
};
export default PopulateFilterList;
