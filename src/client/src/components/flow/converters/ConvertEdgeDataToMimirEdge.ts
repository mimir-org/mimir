import { Connector, Node, Edge } from "@mimirorg/modelbuilder-types";
import { TextResources } from "../../../assets/text/TextResources";
import { LibraryState } from "../../../redux/store/library/types";
import { MimirEdge } from "../../../lib/types/MimirEdge";

/**
 * Function to convert edge data to a Mimir Edge.
 * @param id
 * @param fromConnector
 * @param toConnector
 * @param fromNode
 * @param toNode
 * @param projectId
 * @param projectIri
 * @returns an Edge.
 */
export const ConvertEdgeDataToMimirEdge = (
  id: string,
  fromConnector: Connector,
  toConnector: Connector,
  fromNode: Node,
  toNode: Node,
  projectId: string,
  projectIri: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  library: LibraryState
) => {
  const edge = new MimirEdge({
    id: id,
    iri: null,
    domain: null,
    kind: TextResources.KIND_EDGE,
    fromConnectorId: fromConnector.id,
    fromConnectorIri: fromConnector.iri,
    fromConnector: fromConnector,
    toConnectorId: toConnector.id,
    toConnectorIri: toConnector.iri,
    toConnector: toConnector,
    fromNodeId: fromNode.id,
    fromNodeIri: fromNode.iri,
    fromNode: fromNode,
    toNodeId: toNode.id,
    toNodeIri: toNode.iri,
    toNode: toNode,
    isLocked: false,
    isLockedStatusBy: null,
    isLockedStatusDate: null,
    masterProjectId: projectId,
    masterProjectIri: projectIri,
    projectId: projectId,
    projectIri: projectIri,
    selected: false,
    hidden: false,
    blockHidden: false,
  });

  return edge;
};

/**
 * Function to convert edge data to a Mimir partOf Edge.
 * @param id
 * @param fromConnector
 * @param toConnector
 * @param fromNode
 * @param toNode
 * @param projectId
 * @returns an Edge.
 */
export const ConvertEdgeDataToMimirPartOfEdge = (
  id: string,
  fromConnector: Connector,
  toConnector: Connector,
  fromNode: Node,
  toNode: Node,
  projectId: string
) => {
  return {
    id,
    projectId,
    fromConnectorId: fromConnector.id,
    fromConnector,
    toConnectorId: toConnector.id,
    toConnector,
    fromNodeId: fromNode.id,
    fromNode,
    toNodeId: toNode.id,
    toNode,
    hidden: false,
    masterProjectId: projectId,
    transport: null,
    interface: null,
    kind: TextResources.KIND_EDGE,
  } as Edge;
};
