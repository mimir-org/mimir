import { GetConnectorNode } from "./index";
import { IsFamily } from "../../../../../../helpers/Family";
import { Node, Relation, Terminal } from "@mimirorg/modelbuilder-types";
import { IsLocationRelation, IsProductRelation } from "../../../../../flow/helpers/Connectors";

export const VerifyTransportItem = (items: Terminal[], sourceTerminal: Terminal) =>
  !items.some((conn) => conn.terminalTypeId === sourceTerminal.terminalTypeId) && items.push(sourceTerminal);

export const VerifyLocationItem = (items: Relation[], sourceRelation: Relation) =>
  !items.some((conn) => IsLocationRelation(conn)) && items.push(sourceRelation);

export const VerifyFulfilledByItem = (items: Relation[], sourceRelation: Relation) =>
  !items.some((conn) => IsProductRelation(conn)) && items.push(sourceRelation);

export const VerifyPartOfItem = (items: Relation[], sourceRelation: Relation, nodes: Node[]) => {
  const sourceNode = GetConnectorNode(sourceRelation, nodes);
  let exists = false;

  items.forEach((conn) => {
    const source = GetConnectorNode(conn, nodes);
    if (IsFamily(source, sourceNode)) exists = true;
  });

  if (!exists) items.push(sourceRelation);
};
