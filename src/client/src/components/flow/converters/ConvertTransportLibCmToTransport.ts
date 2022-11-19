import { ConnectorDirection, Transport } from "@mimirorg/modelbuilder-types";
import { TerminalLibCm, TransportLibCm } from "@mimirorg/typelibrary-types";
import { GetDateNowUtc } from "../../../helpers";
import { CreateId } from "../helpers";
import { ConvertTransportAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";
import ConvertTerminalLibCmToTerminal from "./ConvertTerminalLibCmToTerminal";
import { ConvertTypeReference } from "./ConvertTypeReference";

const ConvertTransportLibCmToTransport = (
  trasportLibCm: TransportLibCm,
  isBirectional: boolean,
  terminals: TerminalLibCm[]
): Transport => {
  const id = CreateId();

  const inputTerminal = ConvertTerminalLibCmToTerminal(
    trasportLibCm.terminal,
    isBirectional ? ConnectorDirection.Bidirectional : ConnectorDirection.Input,
    terminals
  );
  const outputTerminal = ConvertTerminalLibCmToTerminal(
    trasportLibCm.terminal,
    isBirectional ? ConnectorDirection.Bidirectional : ConnectorDirection.Output,
    terminals
  );
  const now = GetDateNowUtc();

  const transport: Transport = {
    id: id,
    iri: null,
    version: "1.0",
    rds: trasportLibCm.rdsCode,
    kind: "Transport",
    name: trasportLibCm.name,
    label: trasportLibCm.name,
    description: trasportLibCm.description,
    typeReferences: ConvertTypeReference(trasportLibCm.typeReferences),
    attributes: ConvertTransportAttributeLibCmToAttribute(trasportLibCm.attributes, id),
    inputTerminalId: inputTerminal.id,
    inputTerminal: inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal: outputTerminal,
    updatedBy: null,
    updated: null,
    created: now,
    createdBy: "",
    libraryTypeId: trasportLibCm.id,
  };

  return transport;
};

export default ConvertTransportLibCmToTransport;
