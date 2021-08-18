import { Connector, Transport } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers/common";

const ConvertToTransport = (sourceConn: Connector, library: LibraryState) => {
  const currentTransport = library?.transportTypes.find(
    (x) => x.terminalTypeId === sourceConn.terminalTypeId
  );

  const transportId = CreateId();

  if (currentTransport) {
    if (currentTransport.attributes) {
      currentTransport.attributes.forEach((x) => {
        x.id = CreateId();
        x.transportId = transportId;
      });
    }

    return {
      id: transportId,
      name: currentTransport.name,
      semanticReference: currentTransport.semanticReference,
      terminalId: sourceConn.id,
      terminal: sourceConn,
      attributes: currentTransport.attributes,
    } as Transport;
  }

  return null;
};

export default ConvertToTransport;
