import { Attribute, Interface } from "@mimirorg/modelbuilder-types";
import { createAttributeCopy } from "../attribute";
import { CreateId } from "../../components/flow/helpers";
import { createTerminalCopy } from "../terminal";

export const createInterfaceCopy = (inter: Interface): Interface => {
  if (inter == null) return null;

  const id = CreateId();
  const copy = { ...inter };
  copy.id = id;
  copy.iri = null;
  copy.attributes = [] as Attribute[];

  inter.attributes?.forEach((a) => {
    const attribute = createAttributeCopy(a, id);
    if (attribute != null) copy.attributes.push(attribute);
  });

  copy.inputTerminal = createTerminalCopy(copy.inputTerminal);
  copy.outputTerminal = createTerminalCopy(copy.outputTerminal);

  return copy;
};
