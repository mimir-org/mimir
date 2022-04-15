/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Types from "./types";
import { OffPageObject } from "../../../components/flow/block/nodes/blockNode/helpers/CreateOffPageObject";
import { BlockNodeSize } from "../../../models/project";
import {
  CommitPackage,
  Connector,
  ConnectorVisibility,
  Edge,
  LockAttributeAm,
  LockEdgeAm,
  LockNodeAm,
  Node,
  Project,
  ProjectConverterAm,
  Simple,
} from "../../../models";

export function commitProject(commitPackage: CommitPackage): Types.ProjectActionTypes {
  return { type: Types.COMMIT_PROJECT, payload: commitPackage };
}

export function save(project: Project): Types.ProjectActionTypes {
  return { type: Types.SAVE_PROJECT, payload: { project } };
}

export function get(id: string, project: Project): Types.ProjectActionTypes {
  return { type: Types.FETCHING_PROJECT, payload: { id, project } };
}

export function search(name: string): Types.ProjectActionTypes {
  return { type: Types.SEARCH_PROJECT, payload: name };
}

export function create(name: string, description: string): Types.ProjectActionTypes {
  return { type: Types.CREATING_PROJECT, payload: { name, description, version: "1.0" } };
}

export function createSubProject(
  fromProjectId: string,
  name: string,
  description: string,
  nodes: string[],
  edges: string[]
): Types.CreateSubProject {
  return { type: Types.CREATING_SUB_PROJECT, payload: { fromProjectId, name, description, nodes, edges } };
}

export function addNode(node: Node): Types.ProjectActionTypes {
  return { type: Types.ADD_NODE, payload: node };
}

export function deleteNode(nodeId: string): Types.ProjectActionTypes {
  return { type: Types.DELETE_NODE, payload: nodeId };
}

export function createEdge(edge: Edge): Types.ProjectActionTypes {
  return { type: Types.ADD_EDGE, payload: edge };
}

export function deleteEdge(edgeId: string): Types.ProjectActionTypes {
  return { type: Types.DELETE_EDGE, payload: edgeId };
}

export function updatePosition(nodeId: string, x: number, y: number): Types.ProjectActionTypes {
  return { type: Types.UPDATE_POSITION, payload: { nodeId, x, y } };
}

export function updateBlockPosition(nodeId: string, x: number, y: number): Types.ProjectActionTypes {
  return { type: Types.UPDATE_BLOCK_POSITION, payload: { nodeId, x, y } };
}

export function updateBlockSize(nodeId: string, size: BlockNodeSize): Types.ProjectActionTypes {
  return { type: Types.UPDATE_BLOCK_SIZE, payload: { nodeId, size } };
}

export function setNodeVisibility(node: Node, isParent: boolean): Types.ProjectActionTypes {
  return { type: Types.SET_NODE_VISIBILITY, payload: { node, isParent } };
}

export function setEdgeVisibility(edgeId: string, hidden: boolean): Types.ProjectActionTypes {
  return { type: Types.SET_EDGE_VISIBILITY, payload: { edgeId: edgeId, hidden } };
}

export function setLocationNodeSize(nodeId: string, key: string, value: number): Types.ProjectActionTypes {
  return { type: Types.SET_LOCATION_NODE_SIZE, payload: { nodeId, key, value } };
}

export function setActiveNode(nodeId: string, selected: boolean): Types.ProjectActionTypes {
  return { type: Types.SET_ACTIVE_NODE, payload: { nodeId, selected } };
}

export function setActiveBlockNode(nodeId: string): Types.ProjectActionTypes {
  return { type: Types.SET_ACTIVE_BLOCKNODE, payload: { nodeId } };
}

export function setActiveEdge(edgeId: string, isActive: boolean): Types.ProjectActionTypes {
  return { type: Types.SET_ACTIVE_EDGE, payload: { edgeId, isActive } };
}

export function changeSelectedProject(projectId: string): Types.ProjectActionTypes {
  return { type: Types.CHANGE_SELECTED_PROJECT, payload: { projectId } };
}

export function changeNodeValue(nodeId: string, propName: string, propValue: any): Types.ChangeNodePropValue {
  return { type: Types.CHANGE_NODE_PROP_VALUE, payload: { nodeId, propName, propValue } };
}

export function changeTransportValue(edgeId: string, propName: string, propValue: any): Types.ChangeTransportPropValue {
  return { type: Types.CHANGE_TRANSPORT_PROP_VALUE, payload: { edgeId, propName, propValue } };
}

export function changeInterfaceValue(edgeId: string, propName: string, propValue: any): Types.ChangeInterfacePropValue {
  return { type: Types.CHANGE_INTERFACE_PROP_VALUE, payload: { edgeId, propName, propValue } };
}

export function changeNodeAttributeValue(id: string, node: Node, value: string, unitId: string): Types.ChangeNodeAttributeValue {
  return { type: Types.CHANGE_NODE_ATTRIBUTE_VALUE, payload: { id, value, unitId, nodeId: node.id } };
}

export function changeTransportAttributeValue(
  id: string,
  edge: Edge,
  value: string,
  unitId: string
): Types.ChangeTransportAttributeValue {
  return { type: Types.CHANGE_TRANSPORT_ATTRIBUTE_VALUE, payload: { id, value, unitId, edgeId: edge.id } };
}

export function changeInterfaceAttributeValue(
  id: string,
  edge: Edge,
  value: string,
  unitId: string
): Types.ChangeInterfaceAttributeValue {
  return { type: Types.CHANGE_INTERFACE_ATTRIBUTE_VALUE, payload: { id, value, unitId, edgeId: edge.id } };
}

export function changeNodeTerminalAttributeValue(
  id: string,
  terminal: Connector,
  node: Node,
  value: string,
  unitId: string
): Types.ChangeNodeTerminalAttributeValue {
  return {
    type: Types.CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE,
    payload: { id, value, unitId, terminalId: terminal.id, nodeId: node.id },
  };
}

export function changeTransportTerminalAttributeValue(
  id: string,
  terminal: Connector,
  edge: Edge,
  value: string,
  unitId: string
): Types.ChangeTransportTerminalAttributeValue {
  return {
    type: Types.CHANGE_TRANSPORT_TERMINAL_ATTRIBUTE_VALUE,
    payload: { id, value, unitId, terminalId: terminal.id, edgeId: edge.id },
  };
}

export function changeInterfaceTerminalAttributeValue(
  id: string,
  terminal: Connector,
  edge: Edge,
  value: string,
  unitId: string
): Types.ChangeInterfaceTerminalAttributeValue {
  return {
    type: Types.CHANGE_INTERFACE_TERMINAL_ATTRIBUTE_VALUE,
    payload: { id, value, unitId, terminalId: terminal.id, edgeId: edge.id },
  };
}

export function changeSimpleAttributeValue(
  id: string,
  simple: Simple,
  node: Node,
  value: string,
  unitId: string
): Types.ChangeSimpleAttributeValue {
  return { type: Types.CHANGE_SIMPLE_ATTRIBUTE_VALUE, payload: { id, value, unitId, simpleId: simple.id, nodeId: node.id } };
}

export function deleteProjectError(key: string) {
  return { type: Types.DELETE_PROJECT_ERROR, payload: { key } };
}

export function changeActiveConnector(
  nodeId: string,
  connectorId: string,
  connectorVisibility: ConnectorVisibility
): Types.ProjectActionTypes {
  return { type: Types.CHANGE_ACTIVE_CONNECTOR, payload: { nodeId, connectorId, connectorVisibility } };
}

export function exportProjectToFile(projectConverter: ProjectConverterAm): Types.ProjectActionTypes {
  return { type: Types.EXPORT_PROJECT_TO_FILE, payload: projectConverter };
}

export function importProjectAction(file: File, parserId: string): Types.ProjectActionTypes {
  return { type: Types.IMPORT_PROJECT, payload: { file, parserId } };
}

export function lockNode(id: string, projectId: string, isLocked: boolean, _isLockedStatusBy: string): Types.LockNode {
  return { type: Types.LOCK_NODE, payload: { id, projectId, isLocked } };
}

export function lockEdge(id: string, projectId: string, isLocked: boolean, _isLockedStatusBy: string): Types.LockEdge {
  return { type: Types.LOCK_EDGE, payload: { id, projectId, isLocked } };
}

export function lockAttribute(id: string, projectId: string, isLocked: boolean, _isLockedStatusBy: string): Types.LockAttribute {
  return { type: Types.LOCK_ATTRIBUTE, payload: { id, projectId, isLocked } };
}

export function setIsLockedNode(lockNodeAm: LockNodeAm): Types.SetLockNode {
  return {
    type: Types.SET_LOCK_NODE,
    payload: {
      id: lockNodeAm.id,
      isLocked: lockNodeAm.isLocked,
      isLockedStatusBy: lockNodeAm.isLockedStatusBy,
      isLockedStatusDate: lockNodeAm.isLockedStatusDate,
    },
  };
}

export function setIsLockedEdge(lockEdgeAm: LockEdgeAm): Types.SetLockEdge {
  return {
    type: Types.SET_LOCK_EDGE,
    payload: {
      id: lockEdgeAm.id,
      isLocked: lockEdgeAm.isLocked,
      isLockedStatusBy: lockEdgeAm.isLockedStatusBy,
      isLockedStatusDate: lockEdgeAm.isLockedStatusDate,
    },
  };
}

export function setIsLockedNodeAttribute(lockAttributeAm: LockAttributeAm): Types.SetLockNodeAttribute {
  return {
    type: Types.SET_LOCK_NODE_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      nodeId: lockAttributeAm.nodeId,
      isLocked: lockAttributeAm.isLocked,
      isLockedStatusBy: lockAttributeAm.isLockedStatusBy,
      isLockedStatusDate: lockAttributeAm.isLockedStatusDate,
    },
  };
}

export function setIsLockedTransportAttribute(lockAttributeAm: LockAttributeAm): Types.SetLockTransportAttribute {
  return {
    type: Types.SET_LOCK_TRANSPORT_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      transportId: lockAttributeAm.transportId,
      isLocked: lockAttributeAm.isLocked,
      isLockedStatusBy: lockAttributeAm.isLockedStatusBy,
      isLockedStatusDate: lockAttributeAm.isLockedStatusDate,
    },
  };
}

export function setIsLockedInterfaceAttribute(lockAttributeAm: LockAttributeAm): Types.SetLockInterfaceAttribute {
  return {
    type: Types.SET_LOCK_INTERFACE_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      interfaceId: lockAttributeAm.interfaceId,
      isLocked: lockAttributeAm.isLocked,
      isLockedStatusBy: lockAttributeAm.isLockedStatusBy,
      isLockedStatusDate: lockAttributeAm.isLockedStatusDate,
    },
  };
}

export function setIsLockedNodeTerminalAttribute(lockAttributeAm: LockAttributeAm): Types.SetLockNodeTerminalAttribute {
  return {
    type: Types.SET_LOCK_NODE_TERMINAL_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      terminalId: lockAttributeAm.terminalId,
      nodeId: lockAttributeAm.nodeId,
      isLocked: lockAttributeAm.isLocked,
      isLockedStatusBy: lockAttributeAm.isLockedStatusBy,
      isLockedStatusDate: lockAttributeAm.isLockedStatusDate,
    },
  };
}
export function setIsLockedTransportTerminalAttribute(lockAttributeAm: LockAttributeAm): Types.SetLockTransportTerminalAttribute {
  return {
    type: Types.SET_LOCK_TRANSPORT_TERMINAL_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      terminalId: lockAttributeAm.terminalId,
      transportId: lockAttributeAm.transportId,
      isLocked: lockAttributeAm.isLocked,
      isLockedStatusBy: lockAttributeAm.isLockedStatusBy,
      isLockedStatusDate: lockAttributeAm.isLockedStatusDate,
    },
  };
}
export function setIsLockedInterfaceTerminalAttribute(
  lockAttributeAm: LockAttributeAm,
  _edge: Edge
): Types.SetLockInterfaceTerminalAttribute {
  return {
    type: Types.SET_LOCK_INTERFACE_TERMINAL_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      terminalId: lockAttributeAm.terminalId,
      interfaceId: lockAttributeAm.interfaceId,
      isLocked: lockAttributeAm.isLocked,
      isLockedStatusBy: lockAttributeAm.isLockedStatusBy,
      isLockedStatusDate: lockAttributeAm.isLockedStatusDate,
    },
  };
}

export function setIsLockedSimpleAttribute(lockAttributeAm: LockAttributeAm): Types.SetLockSimpleAttribute {
  return {
    type: Types.SET_LOCK_SIMPLE_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      simpleId: lockAttributeAm.compositeId,
      nodeId: lockAttributeAm.nodeId,
      isLocked: lockAttributeAm.isLocked,
      isLockedStatusBy: lockAttributeAm.isLockedStatusBy,
      isLockedStatusDate: lockAttributeAm.isLockedStatusDate,
    },
  };
}

export function updateNode(node: Node): Types.UpdateNodeAction {
  return { type: Types.UPDATE_NODE, payload: node };
}

export function updateEdge(edge: Edge): Types.UpdateEdgeAction {
  return { type: Types.UPDATE_EDGE, payload: edge };
}

export function setOffPageStatus(nodeId: string, connectorId: string, isRequired: boolean): Types.ProjectActionTypes {
  return { type: Types.SET_OFFPAGE_STATUS, payload: { nodeId, connectorId, isRequired } };
}

export function createRequiredOffPageNode(
  nodeId: string,
  connectorId: string,
  isRequired: boolean,
  offPageObject: OffPageObject
): Types.CreateRequiredOffPageNode {
  return { type: Types.CREATE_REQUIRED_OFFPAGE_NODE, payload: { nodeId, connectorId, isRequired, offPageObject } };
}

export function createConnectedOffPageNode(offPageObject: OffPageObject): Types.CreateConnectedOffPageNode {
  return { type: Types.CREATE_CONNECTED_OFFPAGE_NODE, payload: { offPageObject } };
}
