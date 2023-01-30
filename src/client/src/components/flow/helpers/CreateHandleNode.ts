import {
  Connector,
  ConnectorDirection,
  ConnectorVisibility,
  Edge,
  Node,
  NodeType,
  Relation,
  RelationType,
  Terminal,
} from "@mimirorg/modelbuilder-types";
import { GetDateNowUtc } from "../../../helpers";
import CreateId from "./CreateId";
import { Dispatch } from "redux";
import { addNode, createEdge, updateEdge } from "../../../redux/store/project/actions";
import { IsRelation, IsTerminal } from "../../../services";
import { IsInputConnector } from "./Connectors";

export const CreateHandleEdge = (edge: Edge, handleNode: Node, dispach: Dispatch) => {
  const copy = { ...edge };
  const connector = handleNode.connectors.find((x) => x.type === ConnectorDirection.Output);
  copy.id = CreateId();
  copy.iri = null;
  copy.fromNode = handleNode;
  copy.fromNodeId = handleNode.id;
  copy.fromNodeIri = handleNode.iri;
  copy.fromConnector = connector;
  copy.fromConnectorId = connector.id;
  copy.fromConnectorIri = connector.iri;
  dispach(createEdge(copy));
};

export const UpdateHandleEdge = (edge: Edge, handleNode: Node, dispatch: Dispatch) => {
  const copy = { ...edge };
  const connector = handleNode.connectors.find((x) => IsInputConnector(x));
  copy.toNode = handleNode;
  copy.toNodeId = handleNode.id;
  copy.toNodeIri = handleNode.iri;
  copy.toConnector = connector;
  copy.toConnectorId = connector.id;
  copy.toConnectorIri = connector.iri;
  dispatch(updateEdge(copy));
};

export const CreateHandleNode = (x: number, y: number, edge: Edge, dispach: Dispatch): Node => {
  const now = GetDateNowUtc();
  const nodeId = CreateId();

  const node: Node = {
    id: nodeId,
    iri: null,
    domain: null,
    kind: "Node",
    rds: "handle",
    description: null,
    typeReferences: [],
    name: "handle",
    label: null,
    positionX: x,
    positionY: y,
    isLocked: false,
    isLockedStatusBy: null,
    isLockedStatusDate: null,
    positionBlockX: x,
    positionBlockY: y,
    level: 0,
    order: 0,
    updatedBy: null,
    updated: now,
    created: now,
    createdBy: "System",
    libraryTypeId: "handle",
    version: "1.0",
    aspect: edge.fromNode.aspect,
    nodeType: NodeType.Handler,
    masterProjectId: edge.fromNode.projectId,
    masterProjectIri: null,
    symbol: null,
    purposeString: null,
    connectors: IsRelation(edge.fromConnector)
      ? CreateHandleRelationConnectors(nodeId)
      : IsTerminal(edge.fromConnector)
      ? CreateHandleTerminalConnectors(nodeId, edge.fromConnector)
      : [],
    attributes: [],
    projectId: edge.fromNode.projectId,
    projectIri: null,
    width: 20,
    height: 20,
    selected: false,
    blockSelected: false,
    hidden: false,
    blockHidden: false,
  };

  dispach(addNode(node));
  return node;
};

const CreateHandleTerminalConnectors = (nodeId: string, terminal: Terminal): Connector[] => {
  const connectors = [] as Connector[];

  const inputTerminal: Terminal = {
    kind: "Terminal",
    color: terminal.color,
    terminalTypeId: terminal.terminalTypeId,
    terminalTypeIri: terminal.terminalTypeIri,
    terminalParentTypeId: terminal.terminalParentTypeId,
    terminalParentTypeIri: terminal.terminalParentTypeIri,
    terminalParentTypeName: terminal.terminalParentTypeName,
    attributes: [],
    discriminator: "Terminal",
    isProxy: false,
    proxyParent: null,
    proxySibling: null,
    typeReferences: [],
    id: CreateId(),
    iri: null,
    domain: null,
    name: terminal.name,
    type: ConnectorDirection.Input,
    connectorVisibility: ConnectorVisibility.InputVisible,
    nodeId: nodeId,
    nodeIri: null,
    isRequired: true,
  };

  const outputTerminal: Terminal = {
    kind: "Terminal",
    color: terminal.color,
    terminalTypeId: terminal.terminalTypeId,
    terminalTypeIri: terminal.terminalTypeIri,
    terminalParentTypeId: terminal.terminalParentTypeId,
    terminalParentTypeIri: terminal.terminalParentTypeIri,
    terminalParentTypeName: terminal.terminalParentTypeName,
    attributes: [],
    discriminator: "Terminal",
    isProxy: false,
    proxyParent: null,
    proxySibling: null,
    typeReferences: [],
    id: CreateId(),
    iri: null,
    domain: null,
    name: terminal.name,
    type: ConnectorDirection.Output,
    connectorVisibility: ConnectorVisibility.OutputVisible,
    nodeId: nodeId,
    nodeIri: null,
    isRequired: true,
  };

  connectors.push(inputTerminal);
  connectors.push(outputTerminal);
  return connectors;
};

const CreateHandleRelationConnectors = (nodeId: string): Connector[] => {
  const connectors = [] as Connector[];

  const inputConnector: Relation = {
    kind: "Relation",
    relationType: RelationType.PartOf,
    discriminator: "Relation",
    id: CreateId(),
    iri: null,
    domain: null,
    name: "handle-input",
    type: ConnectorDirection.Input,
    connectorVisibility: ConnectorVisibility.InputVisible,
    nodeId: nodeId,
    nodeIri: null,
    isRequired: true,
  };

  const outputConnector: Relation = {
    kind: "Relation",
    relationType: RelationType.PartOf,
    discriminator: "Relation",
    id: CreateId(),
    iri: null,
    domain: null,
    name: "handle-output",
    type: ConnectorDirection.Output,
    connectorVisibility: ConnectorVisibility.OutputVisible,
    nodeId: nodeId,
    nodeIri: null,
    isRequired: true,
  };

  connectors.push(inputConnector);
  connectors.push(outputConnector);
  return connectors;
};
