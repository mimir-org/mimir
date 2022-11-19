import { ConnectorDirection, ConnectorVisibility, Terminal } from "@mimirorg/modelbuilder-types";
import { TerminalLibCm } from "@mimirorg/typelibrary-types";
import { CreateId } from "../helpers";
import { ConvertTerminalAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";
import { GetTerminalCategoryName } from "./ConvertTerminalLibCmToConnectors";
import { ConvertTypeReference } from "./ConvertTypeReference";

const ConvertTerminalLibCmToTerminal = (
  libTerminal: TerminalLibCm,
  type: ConnectorDirection,
  terminals: TerminalLibCm[]
): Terminal => {
  const id = CreateId();
  const terminalCategory = GetTerminalCategoryName(libTerminal, terminals);

  const terminal: Terminal = {
    color: libTerminal.color,
    terminalTypeId: libTerminal.id,
    terminalTypeIri: libTerminal.iri,
    terminalParentTypeId: libTerminal.parentId,
    terminalParentTypeIri: libTerminal.parentIri,
    terminalParentTypeName: terminalCategory,
    attributes: ConvertTerminalAttributeLibCmToAttribute(libTerminal, id),
    discriminator: "Terminal",
    isProxy: false,
    proxyParent: null,
    proxySibling: null,
    typeReferences: ConvertTypeReference(libTerminal.typeReferences),
    id: id,
    iri: null,
    domain: null,
    kind: "Terminal",
    name: libTerminal.name,
    type: type,
    connectorVisibility: ConnectorVisibility.None,
    nodeId: null,
    nodeIri: null,
    isRequired: false,
  };

  return terminal;
};

export default ConvertTerminalLibCmToTerminal;
