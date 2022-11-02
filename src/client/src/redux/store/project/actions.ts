/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Types from "./types";
import { BlockNodeSize } from "../../../models/project";
import { CommitPackage, LockCm } from "../../../models";
import {
  Project,
  Node,
  Edge,
  ConnectorVisibility,
  EntityType,
  Connector,
  ProjectConverterAm,
  Terminal,
} from "@mimirorg/modelbuilder-types";

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

export function setNodeVisibility(node: Node): Types.ProjectActionTypes {
  return { type: Types.SET_NODE_VISIBILITY, payload: { node } };
}

export function setBlockNodeVisibility(node: Node, blockHidden: boolean): Types.ProjectActionTypes {
  return { type: Types.SET_BLOCK_NODE_VISIBILITY, payload: { node, blockHidden } };
}

export function setEdgeVisibility(edgeId: string, hidden: boolean): Types.ProjectActionTypes {
  return { type: Types.SET_EDGE_VISIBILITY, payload: { edgeId, hidden } };
}

export function setBlockEdgeVisibility(edgeId: string, blockHidden: boolean): Types.ProjectActionTypes {
  return { type: Types.SET_BLOCK_EDGE_VISIBILITY, payload: { edgeId, blockHidden } };
}

export function setLocationNodeSize(nodeId: string, key: string, value: number): Types.ProjectActionTypes {
  return { type: Types.SET_LOCATION_NODE_SIZE, payload: { nodeId, key, value } };
}

export function setSelectedNode(nodeId: string): Types.ProjectActionTypes {
  return { type: Types.SET_SELECTED_NODE, payload: { nodeId } };
}

export function removeSelectedNode(): Types.ProjectActionTypes {
  return { type: Types.REMOVE_SELECTED_NODE, payload: null };
}

export function setSelectedBlockNode(nodeId: string): Types.ProjectActionTypes {
  return { type: Types.SET_SELECTED_BLOCKNODE, payload: { nodeId } };
}

export function removeSelectedBlockNode(): Types.ProjectActionTypes {
  return { type: Types.REMOVE_SELECTED_BLOCKNODE, payload: null };
}

export function setSelectedEdge(edgeId: string): Types.ProjectActionTypes {
  return { type: Types.SET_SELECTED_EDGE, payload: { edgeId } };
}

export function removeSelectedEdge(): Types.ProjectActionTypes {
  return { type: Types.REMOVE_SELECTED_EDGE, payload: null };
}

export function changeSelectedProject(projectId: string): Types.ProjectActionTypes {
  return { type: Types.CHANGE_SELECTED_PROJECT, payload: { projectId } };
}

export function closeProject(): Types.ProjectActionTypes {
  return { type: Types.CLOSE_PROJECT, payload: null };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function lockEntity(id: string, projectId: string, isLocked: boolean, type: EntityType): Types.LockEntity {
  return { type: Types.LOCK_ENTITY, payload: { id, projectId, isLocked, type } };
}

export function setLockedNode(lock: LockCm): Types.SetLockNode {
  return { type: Types.SET_LOCK_NODE, payload: lock };
}

export function setLockedNodes(locks: LockCm[]): Types.SetLockNodes {
  return { type: Types.SET_LOCK_NODES, payload: locks };
}

export function setLockedEdge(lock: LockCm): Types.SetLockEdge {
  return { type: Types.SET_LOCK_EDGE, payload: lock };
}

export function setLockedEdges(locks: LockCm[]): Types.SetLockEdges {
  return { type: Types.SET_LOCK_EDGES, payload: locks };
}

export function setLockedAttribute(lock: LockCm): Types.SetLockAttribute {
  return { type: Types.SET_LOCK_ATTRIBUTE, payload: lock };
}

export function setLockedAttributes(locks: LockCm[]): Types.SetLockAttributes {
  return { type: Types.SET_LOCK_ATTRIBUTES, payload: locks };
}

export function updateNode(node: Node): Types.UpdateNodeAction {
  return { type: Types.UPDATE_NODE, payload: node };
}

export function updateEdge(edge: Edge): Types.UpdateEdgeAction {
  return { type: Types.UPDATE_EDGE, payload: edge };
}

export function addTerminal(terminal: Terminal): Types.ProjectActionTypes {
  return { type: Types.ADD_TERMINAL, payload: { terminal: terminal } };
}

export function deleteTerminal(terminal: Terminal): Types.ProjectActionTypes {
  return { type: Types.DELETE_TERMINAL, payload: { terminal: terminal } };
}

export function updateTerminal(terminal: Terminal): Types.ProjectActionTypes {
  return { type: Types.UPDATE_TERMINAL, payload: { terminal: terminal } };
}
