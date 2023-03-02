import { ConnectorDirection, Transport } from "@mimirorg/modelbuilder-types";
import { TerminalLibCm, TransportLibCm } from "@mimirorg/typelibrary-types";
import { CreateId } from "../helpers";
import { ConvertTransportAttributeLibCmToAttribute } from "./ConvertAttributeLibCmToAttribute";
import ConvertTerminalLibCmToTerminal from "./ConvertTerminalLibCmToTerminal";
import { ConvertTypeReference } from "./ConvertTypeReference";
import GetDateNowUtc from "../../../lib/helpers/getDateNowUtc";

const ConvertTransportLibCmToTransport = (
  transportLibCm: TransportLibCm,
  isBirectional: boolean,
  terminals: TerminalLibCm[]
): Transport => {
  const id = CreateId();

  const inputTerminal = ConvertTerminalLibCmToTerminal(
    transportLibCm.terminal,
    isBirectional ? ConnectorDirection.Bidirectional : ConnectorDirection.Input,
    terminals
  );
  const outputTerminal = ConvertTerminalLibCmToTerminal(
    transportLibCm.terminal,
    isBirectional ? ConnectorDirection.Bidirectional : ConnectorDirection.Output,
    terminals
  );
  const now = GetDateNowUtc();

  const transport: Transport = {
    id: id,
    iri: null,
    version: "1.0",
    rds: transportLibCm.rdsCode,
    kind: "Transport",
    name: transportLibCm.name,
    label: transportLibCm.name,
    description: transportLibCm.description,
    typeReferences: ConvertTypeReference(transportLibCm.typeReferences),
    attributes: ConvertTransportAttributeLibCmToAttribute(transportLibCm.attributes, id),
    inputTerminalId: inputTerminal.id,
    inputTerminal: inputTerminal,
    outputTerminalId: outputTerminal.id,
    outputTerminal: outputTerminal,
    updatedBy: null,
    updated: null,
    created: now,
    createdBy: "",
    libraryTypeId: transportLibCm.id,
  };

  return transport;
};

export default ConvertTransportLibCmToTransport;
