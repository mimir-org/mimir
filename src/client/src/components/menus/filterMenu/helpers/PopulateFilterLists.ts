import { Node, Edge, Connector } from "@mimirorg/modelbuilder-types";
import { IsOffPageEdge } from "../../../flow/block/helpers/IsOffPageEdge";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation, IsTerminal } from "../../../flow/helpers/Connectors";
import { VerifyFulfilledByItem, VerifyPartOfItem, VerifyRelationItem, VerifyTransportItem } from "../components/filters/helpers";

/**
 * Method to add content to the different categories in the Visual Filter.
 * @param edges
 * @param nodes
 * @param transportItems
 * @param relationItems
 * @param partOfItems
 */
const PopulateFilterLists = (
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

    if (IsTerminal(sourceConn)) VerifyTransportItem(transportItems, sourceConn);
    else if (IsLocationRelation(sourceConn)) VerifyRelationItem(relationItems, sourceConn);
    else if (IsProductRelation(sourceConn)) VerifyFulfilledByItem(relationItems, sourceConn);
    else if (IsPartOfRelation(sourceConn)) VerifyPartOfItem(partOfItems, sourceConn, nodes);
  });
};

export default PopulateFilterLists;
