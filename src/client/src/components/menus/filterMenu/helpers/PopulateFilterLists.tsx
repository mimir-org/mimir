import { ValidateRelationItem, ValidatePartOfItem, ValidateTransportItem, ValidateFulfilledByItem } from ".";
import { Connector, Edge } from "../../../../models";
import { IsLocationTerminal, IsPartOf, IsTransport, IsProductTerminal } from "../../../flow/helpers";

/**
 * Method to add content to the drop-down menus in FilterMenu.
 * @param edges
 * @param transportItems
 * @param relationItems
 * @param partOfItems
 */
const PopulateFilterList = (edges: Edge[], transportItems: Connector[], relationItems: Connector[], partOfItems: Connector[]) => {
  edges.forEach((e) => {
    const sourceConn = e.fromConnector;

    if (IsTransport(sourceConn)) ValidateTransportItem(transportItems, sourceConn);
    if (IsLocationTerminal(sourceConn)) ValidateRelationItem(relationItems, sourceConn);
    if (IsProductTerminal(sourceConn)) ValidateFulfilledByItem(relationItems, sourceConn);
    if (IsPartOf(sourceConn)) ValidatePartOfItem(partOfItems, sourceConn);
  });
};
export default PopulateFilterList;
