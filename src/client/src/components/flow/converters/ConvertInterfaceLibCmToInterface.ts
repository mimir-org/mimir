import { ConnectorDirection, Interface } from "@mimirorg/modelbuilder-types";
import { TerminalLibCm, InterfaceLibCm } from "@mimirorg/typelibrary-types";
import { GetDateNowUtc } from "../../../helpers";
import { CreateId } from "../helpers";
import { ConvertInterfaceAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";
import ConvertTerminalLibCmToTerminal from "./ConvertTerminalLibCmToTerminal";
import { ConvertTypeReference } from "./ConvertTypeReference";

const ConvertInterfaceLibCmToInterface = (
  InterfaceLibCm: InterfaceLibCm,
  isBirectional: boolean,
  terminals: TerminalLibCm[]
): Interface => {
  const id = CreateId();

  const inputTerminal = ConvertTerminalLibCmToTerminal(
    InterfaceLibCm.terminal,
    isBirectional ? ConnectorDirection.Bidirectional : ConnectorDirection.Input,
    terminals
  );
  const outputTerminal = ConvertTerminalLibCmToTerminal(
    InterfaceLibCm.terminal,
    isBirectional ? ConnectorDirection.Bidirectional : ConnectorDirection.Output,
    terminals
  );
  const now = GetDateNowUtc();

  const inter: Interface = {
    id: id,
    iri: null,
    version: "1.0",
    rds: InterfaceLibCm.rdsCode,
    kind: "Interface",
    name: InterfaceLibCm.name,
    label: InterfaceLibCm.name,
    description: InterfaceLibCm.description,
    typeReferences: ConvertTypeReference(InterfaceLibCm.typeReferences),
    attributes: ConvertInterfaceAttributeLibCmToAttribute(InterfaceLibCm.attributes, id),
    inputTerminalId: inputTerminal.id,
    inputTerminal: inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal: outputTerminal,
    updatedBy: null,
    updated: null,
    created: now,
    createdBy: "",
    libraryTypeId: InterfaceLibCm.id,
  };

  return inter;
};

export default ConvertInterfaceLibCmToInterface;
