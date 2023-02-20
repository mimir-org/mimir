import { Transport, Attribute } from "@mimirorg/modelbuilder-types";
import { createAttributeCopy } from "../attribute";
import { CreateId } from "../../components/flow/helpers";
import { createTerminalCopy } from "../terminal";

export const createTransportCopy = (transport: Transport): Transport => {
  if (transport == null) return null;

  const id = CreateId();
  const copy = { ...transport };
  copy.id = id;
  copy.iri = null;
  copy.attributes = [] as Attribute[];

  transport.attributes?.forEach((a) => {
    const attribute = createAttributeCopy(a, id);
    if (attribute != null) copy.attributes.push(attribute);
  });

  copy.inputTerminal = createTerminalCopy(copy.inputTerminal);
  copy.outputTerminal = createTerminalCopy(copy.outputTerminal);

  return copy;
};
