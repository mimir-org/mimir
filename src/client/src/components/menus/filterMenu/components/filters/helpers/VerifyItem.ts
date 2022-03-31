import { GetConnectorNode } from "./index";
import { IsFamily } from "../../../../../../helpers/Family";
import { Connector } from "../../../../../../models";
import { IsLocationTerminal, IsProductTerminal } from "../../../../../flow/helpers/Connectors";

export const VerifyTransportItem = (items: Connector[], sourceConn: Connector) =>
  !items.some((conn) => conn.terminalTypeId === sourceConn.terminalTypeId) && items.push(sourceConn);

export const VerifyRelationItem = (items: Connector[], sourceConn: Connector) =>
  !items.some((conn) => IsLocationTerminal(conn)) && items.push(sourceConn);

export const VerifyFulfilledByItem = (items: Connector[], sourceConn: Connector) =>
  !items.some((conn) => IsProductTerminal(conn)) && items.push(sourceConn);

export const VerifyPartOfItem = (items: Connector[], sourceConn: Connector) => {
  const sourceNode = GetConnectorNode(sourceConn);
  let exists = false;

  items.forEach((conn) => {
    const source = GetConnectorNode(conn);
    if (IsFamily(source, sourceNode)) exists = true;
  });

  if (!exists) items.push(sourceConn);
};
