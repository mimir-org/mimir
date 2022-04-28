import * as Types from "./types";
import { OffPageObject } from "../../../components/flow/block/nodes/blockNode/helpers/CreateOffPageObject";
import { BlockNodeSize } from "../../../models/project";
import { EntityType } from "../../../models/enums/EntityType";
import {
  CommitPackage,
  Connector,
  ConnectorVisibility,
  Edge,
  LockCm,
  Node,
  Project,
  ProjectConverterAm,
  Simple,
} from "../../../models";

export function commitProject(commitPackage: CommitPackage): Types.ProjectActionTypes {
  return {
    type: Types.COMMIT_PROJECT,
    payload: commitPackage,
  };
}

export function save(project: Project): Types.ProjectActionTypes {
  return {
    type: Types.SAVE_PROJECT,
    payload: { project },
  };
}

export function get(id: string, project: Project): Types.ProjectActionTypes {
  return {
    type: Types.FETCHING_PROJECT,
    payload: {
      id,
      project,
    },
  };
}

export function search(name: string): Types.ProjectActionTypes {
  return {
    type: Types.SEARCH_PROJECT,
    payload: name,
  };
}

export function create(name: string, description: string): Types.ProjectActionTypes {
  return {
    type: Types.CREATING_PROJECT,
    payload: {
      name: name,
      description: description,
      version: "1.0",
    },
  };
}

export function createSubProject(
  fromProjectId: string,
  name: string,
  description: string,
  nodes: string[],
  edges: string[]
): Types.CreateSubProject {
  return {
    type: Types.CREATING_SUB_PROJECT,
    payload: {
      fromProjectId,
      name,
      description,
      nodes,
      edges,
    },
  };
}

export function addNode(node: Node): Types.ProjectActionTypes {
  return {
    type: Types.ADD_NODE,
    payload: node,
  };
}

export function removeNode(nodeId: string): Types.ProjectActionTypes {
  return {
    type: Types.REMOVE_NODE,
    payload: nodeId,
  };
}

export function createEdge(edge: Edge): Types.ProjectActionTypes {
  return {
    type: Types.ADD_EDGE,
    payload: edge,
  };
}

export function removeEdge(edgeId: string): Types.ProjectActionTypes {
  return {
    type: Types.REMOVE_EDGE,
    payload: edgeId,
  };
}

export function updatePosition(nodeId: string, x: number, y: number): Types.ProjectActionTypes {
  return {
    type: Types.UPDATE_POSITION,
    payload: {
      nodeId: nodeId,
      x: x,
      y: y,
    },
  };
}

export function updateBlockPosition(nodeId: string, x: number, y: number): Types.ProjectActionTypes {
  return {
    type: Types.UPDATE_BLOCK_POSITION,
    payload: {
      nodeId: nodeId,
      x: x,
      y: y,
    },
  };
}

export function updateBlockSize(nodeId: string, size: BlockNodeSize): Types.ProjectActionTypes {
  return {
    type: Types.UPDATE_BLOCK_SIZE,
    payload: {
      nodeId,
      size,
    },
  };
}

export function setNodeVisibility(node: Node, isParent: boolean): Types.ProjectActionTypes {
  return {
    type: Types.SET_NODE_VISIBILITY,
    payload: { node, isParent },
  };
}

export function setEdgeVisibility(edge: Edge, isHidden: boolean): Types.ProjectActionTypes {
  return {
    type: Types.SET_EDGE_VISIBILITY,
    payload: { edge, isHidden },
  };
}

export function setLocationNodeSize(nodeId: string, key: string, value: number): Types.ProjectActionTypes {
  return {
    type: Types.SET_LOCATION_NODE_SIZE,
    payload: { nodeId, key, value },
  };
}

export function setActiveNode(nodeId: string, isActive: boolean): Types.ProjectActionTypes {
  return {
    type: Types.SET_ACTIVE_NODE,
    payload: { nodeId, isActive },
  };
}

export function setActiveBlockNode(nodeId: string): Types.ProjectActionTypes {
  return {
    type: Types.SET_ACTIVE_BLOCKNODE,
    payload: { nodeId },
  };
}

export function setActiveEdge(edgeId: string, isActive: boolean): Types.ProjectActionTypes {
  return {
    type: Types.SET_ACTIVE_EDGE,
    payload: { edgeId, isActive },
  };
}

export function changeSelectedProject(projectId: string): Types.ProjectActionTypes {
  return {
    type: Types.CHANGE_SELECTED_PROJECT,
    payload: { projectId },
  };
}

export function closeProject(): Types.ProjectActionTypes {
  return {
    type: Types.CLOSE_PROJECT,
    payload: null,
  };
}

export function changeAllNodes(visible: boolean): Types.ProjectActionTypes {
  return {
    type: Types.CHANGE_ALL_NODES,
    payload: { visible },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function changeNodeValue(nodeId: string, propName: string, propValue: any): Types.ChangeNodePropValue {
  return {
    type: Types.CHANGE_NODE_PROP_VALUE,
    payload: {
      nodeId,
      propName,
      propValue,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function changeTransportValue(edgeId: string, propName: string, propValue: any): Types.ChangeTransportPropValue {
  return {
    type: Types.CHANGE_TRANSPORT_PROP_VALUE,
    payload: {
      edgeId,
      propName,
      propValue,
    },
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function changeInterfaceValue(edgeId: string, propName: string, propValue: any): Types.ChangeInterfacePropValue {
  return {
    type: Types.CHANGE_INTERFACE_PROP_VALUE,
    payload: {
      edgeId,
      propName,
      propValue,
    },
  };
}

export function changeNodeAttributeValue(id: string, node: Node, value: string, unitId: string): Types.ChangeNodeAttributeValue {
  return {
    type: Types.CHANGE_NODE_ATTRIBUTE_VALUE,
    payload: {
      id,
      value,
      unitId,
      nodeId: node.id,
    },
  };
}

export function changeTransportAttributeValue(
  id: string,
  edge: Edge,
  value: string,
  unitId: string
): Types.ChangeTransportAttributeValue {
  return {
    type: Types.CHANGE_TRANSPORT_ATTRIBUTE_VALUE,
    payload: {
      id,
      value,
      unitId,
      edgeId: edge.id,
    },
  };
}

export function changeInterfaceAttributeValue(
  id: string,
  edge: Edge,
  value: string,
  unitId: string
): Types.ChangeInterfaceAttributeValue {
  return {
    type: Types.CHANGE_INTERFACE_ATTRIBUTE_VALUE,
    payload: {
      id,
      value,
      unitId,
      edgeId: edge.id,
    },
  };
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
    payload: {
      id,
      value,
      unitId,
      terminalId: terminal.id,
      nodeId: node.id,
    },
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
    payload: {
      id,
      value,
      unitId,
      terminalId: terminal.id,
      edgeId: edge.id,
    },
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
    payload: {
      id,
      value,
      unitId,
      terminalId: terminal.id,
      edgeId: edge.id,
    },
  };
}

export function changeSimpleAttributeValue(
  id: string,
  simple: Simple,
  node: Node,
  value: string,
  unitId: string
): Types.ChangeSimpleAttributeValue {
  return {
    type: Types.CHANGE_SIMPLE_ATTRIBUTE_VALUE,
    payload: {
      id,
      value,
      unitId,
      simpleId: simple.id,
      nodeId: node.id,
    },
  };
}

export function deleteProjectError(key: string) {
  return {
    type: Types.DELETE_PROJECT_ERROR,
    payload: {
      key,
    },
  };
}

export function changeActiveConnector(
  nodeId: string,
  connectorId: string,
  connectorVisibility: ConnectorVisibility
): Types.ProjectActionTypes {
  return {
    type: Types.CHANGE_ACTIVE_CONNECTOR,
    payload: {
      nodeId,
      connectorId,
      connectorVisibility,
    },
  };
}

export function exportProjectToFile(projectConverter: ProjectConverterAm): Types.ProjectActionTypes {
  return {
    type: Types.EXPORT_PROJECT_TO_FILE,
    payload: projectConverter,
  };
}

export function importProjectAction(file: File, parserId: string): Types.ProjectActionTypes {
  return {
    type: Types.IMPORT_PROJECT,
    payload: {
      file: file,
      parserId: parserId,
    },
  };
}

export function lockEntity(id: string, projectId: string, isLocked: boolean, type: EntityType): Types.LockEntity {
  return {
    type: Types.LOCK_ENTITY,
    payload: {
      id: id,
      projectId: projectId,
      isLocked: isLocked,
      type: type,
    },
  };
}

export function setLockedNode(lock: LockCm): Types.SetLockNode {
  return {
    type: Types.SET_LOCK_NODE,
    payload: lock,
  };
}

export function setLockedNodes(locks: LockCm[]): Types.SetLockNodes {
  return {
    type: Types.SET_LOCK_NODES,
    payload: locks,
  };
}

export function setLockedEdge(lock: LockCm): Types.SetLockEdge {
  return {
    type: Types.SET_LOCK_EDGE,
    payload: lock,
  };
}

export function setLockedEdges(locks: LockCm[]): Types.SetLockEdges {
  return {
    type: Types.SET_LOCK_EDGES,
    payload: locks,
  };
}

export function setLockedAttribute(lock: LockCm): Types.SetLockAttribute {
  return {
    type: Types.SET_LOCK_ATTRIBUTE,
    payload: lock,
  };
}

export function setLockedAttributes(locks: LockCm[]): Types.SetLockAttributes {
  return {
    type: Types.SET_LOCK_ATTRIBUTES,
    payload: locks,
  };
}

export function updateNode(node: Node): Types.UpdateNodeAction {
  return {
    type: Types.UPDATE_NODE,
    payload: node,
  };
}

export function updateEdge(edge: Edge): Types.UpdateEdgeAction {
  return {
    type: Types.UPDATE_EDGE,
    payload: edge,
  };
}

export function setOffPageStatus(nodeId: string, connectorId: string, isRequired: boolean): Types.ProjectActionTypes {
  return {
    type: Types.SET_OFFPAGE_STATUS,
    payload: {
      nodeId: nodeId,
      connectorId: connectorId,
      isRequired: isRequired,
    },
  };
}

export function createRequiredOffPageNode(
  nodeId: string,
  connectorId: string,
  isRequired: boolean,
  offPageObject: OffPageObject
): Types.CreateRequiredOffPageNode {
  return {
    type: Types.CREATE_REQUIRED_OFFPAGE_NODE,
    payload: {
      nodeId: nodeId,
      connectorId: connectorId,
      isRequired: isRequired,
      offPageObject: offPageObject,
    },
  };
}

export function createConnectedOffPageNode(offPageObject: OffPageObject): Types.CreateConnectedOffPageNode {
  return {
    type: Types.CREATE_CONNECTED_OFFPAGE_NODE,
    payload: {
      offPageObject: offPageObject,
    },
  };
}
