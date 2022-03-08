import { GetConnectorNode } from "./index";
import { IsFamily } from "../../../../../../helpers";
import { Connector } from "../../../../../../models";
import { IsLocationTerminal, IsProductTerminal } from "../../../../../flow/helpers";

export function ValidateTransportItem(items: Connector[], sourceConn: Connector) {
  if (!items.some((conn) => conn.terminalTypeId === sourceConn.terminalTypeId)) items.push(sourceConn);
}

export function ValidateRelationItem(items: Connector[], sourceConn: Connector) {
  if (!items.some((conn) => IsLocationTerminal(conn))) items.push(sourceConn);
}

export function ValidateFulfilledByItem(items: Connector[], sourceConn: Connector) {
  if (!items.some((conn) => IsProductTerminal(conn))) items.push(sourceConn);
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
