import { GetConnectorNode } from "./index";
import { IsFamily } from "../../../../../../helpers/CheckTypes";
import { Connector } from "../../../../../../models";
import { IsLocationTerminal, IsProductTerminal } from "../../../../../flow/helpers/CheckConnectorTypes";

export function VerifyTransportItem(items: Connector[], sourceConn: Connector) {
  if (!items.some((conn) => conn.terminalTypeId === sourceConn.terminalTypeId)) items.push(sourceConn);
}

export function VerifyRelationItem(items: Connector[], sourceConn: Connector) {
  if (!items.some((conn) => IsLocationTerminal(conn))) items.push(sourceConn);
}

export function VerifyFulfilledByItem(items: Connector[], sourceConn: Connector) {
  if (!items.some((conn) => IsProductTerminal(conn))) items.push(sourceConn);
}

export function VerifyPartOfItem(items: Connector[], sourceConn: Connector) {
  const sourceNode = GetConnectorNode(sourceConn);
  let exists = false;

  items.forEach((conn) => {
    const source = GetConnectorNode(conn);
    if (IsFamily(source, sourceNode)) exists = true;
  });

  if (!exists) items.push(sourceConn);
}
