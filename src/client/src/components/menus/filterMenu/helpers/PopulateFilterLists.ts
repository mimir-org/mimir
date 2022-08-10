import { Node, Edge, Relation, Terminal } from "@mimirorg/modelbuilder-types";
import { IsOffPageEdge } from "../../../flow/block/helpers/IsOffPageEdge";
import { IsLocationRelation, IsPartOfRelation, IsProductRelation, IsTerminal } from "../../../flow/helpers/Connectors";
import { VerifyFulfilledByItem, VerifyPartOfItem, VerifyLocationItem, VerifyTransportItem } from "../components/filters/helpers";

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
  transportItems: Terminal[],
  relationItems: Relation[],
  partOfItems: Relation[],
  isTreeView: boolean
) => {
  edges.forEach((edge) => {
    if (isTreeView && IsOffPageEdge(edge)) return;

    const sourceConn = edge.fromConnector;

    if (IsTerminal(sourceConn)) VerifyTransportItem(transportItems, sourceConn);
    else if (IsLocationRelation(sourceConn)) VerifyLocationItem(relationItems, sourceConn as Relation);
    else if (IsProductRelation(sourceConn)) VerifyFulfilledByItem(relationItems, sourceConn as Relation);
    else if (IsPartOfRelation(sourceConn)) VerifyPartOfItem(partOfItems, sourceConn as Relation, nodes);
  });
};

export default PopulateFilterLists;
