import { GetConnectorNode } from "./index";
import { IsFamily } from "../../../../../../helpers/Family";
import { Node, Connector } from "../../../../../../models";
import { IsLocationRelation, IsProductRelation } from "../../../../../flow/helpers/Connectors";

export const VerifyTransportItem = (items: Connector[], sourceConn: Connector) =>
  !items.some((conn) => conn.terminalTypeId === sourceConn.terminalTypeId) && items.push(sourceConn);

export const VerifyRelationItem = (items: Connector[], sourceConn: Connector) =>
  !items.some((conn) => IsLocationRelation(conn)) && items.push(sourceConn);

export const VerifyFulfilledByItem = (items: Connector[], sourceConn: Connector) =>
  !items.some((conn) => IsProductRelation(conn)) && items.push(sourceConn);

export const VerifyPartOfItem = (items: Connector[], sourceConn: Connector, nodes: Node[]) => {
  const sourceNode = GetConnectorNode(sourceConn, nodes);
  let exists = false;

  items.forEach((conn) => {
    const source = GetConnectorNode(conn, nodes);
    if (IsFamily(source, sourceNode)) exists = true;
  });

  if (!exists) items.push(sourceConn);
};
