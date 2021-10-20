import { GetConnectorNode } from ".";
import { Connector } from "../../../../models";
import { IsFamily, IsLocationTerminal } from "../../../flow/helpers";

export function ValidateTransportItem(items: Connector[], sourceConn: Connector) {
  if (!items.some((conn) => conn.terminalTypeId === sourceConn.terminalTypeId)) items.push(sourceConn);
}

export function ValidateRelationItem(items: Connector[], sourceConn: Connector) {
  if (!items.some((conn) => IsLocationTerminal(conn))) items.push(sourceConn);
}

export function ValidatePartOfItem(items: Connector[], sourceConn: Connector) {
  const sourceNode = GetConnectorNode(sourceConn);
  let exists = false;

  items.forEach((conn) => {
    const source = GetConnectorNode(conn);
    if (IsFamily(source, sourceNode)) exists = true;
  });

  if (!exists) items.push(sourceConn);
}