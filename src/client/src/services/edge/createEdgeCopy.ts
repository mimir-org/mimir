import { Edge } from "@mimirorg/modelbuilder-types";
import { CreateId } from "../../components/flow/helpers";
import { createInterfaceCopy } from "../interface/createInterfaceCopy";
import { createNodeCopy } from "../node/createNodeCopy";
import { createRelationCopy } from "../relation/createRelationCopy";
import { createTerminalCopy } from "../terminal/createTerminalCopy";
import { createTransportCopy } from "../transport/createTransportCopy";
import { IsRelation, IsTerminal } from "../typeService";

export const createEdgeCopy = (edge: Edge): Edge => {
  if (edge == null) return null;

  const id = CreateId();
  const copy = { ...edge };

  copy.id = id;
  copy.iri = null;

  copy.interface = createInterfaceCopy(copy.interface);
  copy.interfaceId = copy.interface?.id;
  copy.transport = createTransportCopy(copy.interface);
  copy.transportId = copy.transport?.id;

  copy.fromConnector = IsRelation(copy.fromConnector)
    ? createRelationCopy(copy.fromConnector)
    : IsTerminal(copy.fromConnector)
    ? createTerminalCopy(copy.fromConnector)
    : null;
  copy.fromConnectorIri = copy.fromConnector?.iri;
  copy.fromConnectorId = copy.fromConnector?.id;

  copy.toConnector = IsRelation(copy.toConnector)
    ? createRelationCopy(copy.toConnector)
    : IsTerminal(copy.toConnector)
    ? createTerminalCopy(copy.toConnector)
    : null;
  copy.toConnectorIri = copy.toConnector?.iri;
  copy.toConnectorId = copy.toConnector?.id;

  copy.fromNode = createNodeCopy(copy.fromNode);
  copy.fromNodeId = copy.fromNode?.id;
  copy.fromNodeIri = copy.fromNode?.iri;

  copy.toNode = createNodeCopy(copy.toNode);
  copy.toNodeId = copy.toNode?.id;
  copy.toNodeIri = copy.toNode?.iri;

  return copy;
};
