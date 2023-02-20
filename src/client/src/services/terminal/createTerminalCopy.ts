import { Terminal, Attribute } from "@mimirorg/modelbuilder-types";
import { CreateId } from "../../components/flow/helpers";
import { createAttributeCopy } from "..";

export const createTerminalCopy = (terminal: Terminal): Terminal => {
  if (terminal == null) return null;

  const id = CreateId();
  const copy = { ...terminal };
  copy.id = id;
  copy.iri = null;
  copy.attributes = [] as Attribute[];

  terminal.attributes?.forEach((a) => {
    const attribute = createAttributeCopy(a, id);
    if (attribute != null) copy.attributes.push(attribute);
  });

  return copy;
};
