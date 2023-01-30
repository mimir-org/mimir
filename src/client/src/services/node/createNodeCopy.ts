import { Node, Attribute, Connector } from "@mimirorg/modelbuilder-types";
import { createAttributeCopy } from "../attribute";
import { CreateId } from "../../components/flow/helpers";
import { createTerminalCopy } from "../terminal";
import { IsRelation, IsTerminal } from "../typeService";
import { createRelationCopy } from "../relation";

export const createNodeCopy = (node: Node): Node => {
  if (node == null) return null;

  const id = CreateId();
  const copy = { ...node };
  copy.id = id;
  copy.iri = null;
  copy.attributes = [] as Attribute[];
  copy.connectors = [] as Connector[];

  node.attributes?.forEach((a) => {
    const attribute = createAttributeCopy(a, id);
    if (attribute != null) copy.attributes.push(attribute);
  });

  node.connectors?.forEach((c) => {
    const connector = IsRelation(c) ? createRelationCopy(c) : IsTerminal(c) ? createTerminalCopy(c) : null;
    if (connector != null) copy.connectors.push(connector);
  });

  return copy;
};
