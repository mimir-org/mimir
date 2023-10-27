import { GetConnectorNode } from "./index";
import { IsFamily } from "../../../../../../helpers/Family";
import { Block, ConnectorFulfilledBy, ConnectorHasLocation, ConnectorPartOf, ConnectorTerminal } from "lib";

export const VerifyTransportItem = (items: ConnectorTerminal[], sourceTerminal: ConnectorTerminal) =>
  !items.some((conn) => conn.terminalType === sourceTerminal.terminalType) && items.push(sourceTerminal);

export const VerifyLocationItem = (items: ConnectorHasLocation[], sourceRelation: ConnectorHasLocation) =>
  !items.some((conn) => items.push(sourceRelation));

export const VerifyFulfilledByItem = (items: ConnectorFulfilledBy[], sourceRelation: ConnectorFulfilledBy) =>
  !items.some((conn) => items.push(sourceRelation));

export const VerifyPartOfItem = (items: ConnectorPartOf[], sourceRelation: ConnectorPartOf, nodes: Block[]) => {
  const sourceNode = GetConnectorNode(sourceRelation, nodes);
  let exists = false;

  items.forEach((conn) => {
    const source = GetConnectorNode(conn, nodes);
    if (IsFamily(source, sourceNode)) exists = true;
  });

  if (!exists) items.push(sourceRelation);
};
