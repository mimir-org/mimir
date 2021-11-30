import { GetConnectorNode } from ".";
import { IsFamily } from "../../../../helpers";
import { Connector } from "../../../../models";
import { IsLocationTerminal, IsProductTerminal } from "../../../flow/helpers";

const FLUID_TERMINAL_CATEGORY_ID = "7AF97A80D52C7CE139AE278A712C6A37"; // TODO: Remove

export function ValidateTransportItem(items: Connector[], sourceConn: Connector) {
  if (!items.some((conn) => conn.terminalTypeId === sourceConn.terminalTypeId)) items.push(sourceConn);
}

export function ValidateFluidItem(items: Connector[], sourceConn: Connector) {
  if (sourceConn.terminalCategoryId === FLUID_TERMINAL_CATEGORY_ID) items.push(sourceConn);
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
