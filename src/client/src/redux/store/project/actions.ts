import * as Types from "./types";
import {
  Node,
  Edge,
  Project,
  CommitPackage,
  Connector,
  Composite,
  ProjectFileAm,
  ProjectConverterAm,
  LockAttributeAm,
  LockNodeAm,
  LockEdgeAm,
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
    payload: project,
  };
}

export function get(id: string): Types.ProjectActionTypes {
  return {
    type: Types.FETCHING_PROJECT,
    payload: id,
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

export function setEdgeAnimation(edge: Edge, animated: boolean): Types.ProjectActionTypes {
  return {
    type: Types.SET_EDGE_ANIMATION,
    payload: { edge, animated },
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

export function changeAllNodes(visible: boolean): Types.ProjectActionTypes {
  return {
    type: Types.CHANGE_ALL_NODES,
    payload: { visible },
  };
}

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

export function changeCompositeAttributeValue(
  id: string,
  composite: Composite,
  node: Node,
  value: string,
  unitId: string
): Types.ChangeCompositeAttributeValue {
  return {
    type: Types.CHANGE_COMPOSITE_ATTRIBUTE_VALUE,
    payload: {
      id,
      value,
      unitId,
      compositeId: composite.id,
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
  visible: boolean,
  inputOrder: number,
  outputOrder: number
): Types.ProjectActionTypes {
  return {
    type: Types.CHANGE_ACTIVE_CONNECTOR,
    payload: {
      nodeId,
      connectorId,
      visible,
      inputOrder,
      outputOrder,
    },
  };
}

export function exportProjectToFile(projectConverter: ProjectConverterAm): Types.ProjectActionTypes {
  return {
    type: Types.EXPORT_PROJECT_TO_FILE,
    payload: projectConverter,
  };
}

export function importProjectAction(data: ProjectFileAm): Types.ProjectActionTypes {
  return {
    type: Types.IMPORT_PROJECT,
    payload: data,
  };
}

export function lockNode(id: string, projectId: string, isLocked: boolean, isLockedBy: string): Types.LockNode {
  return {
    type: Types.LOCK_NODE,
    payload: {
      id: id,
      projectId,
      isLocked,
      isLockedBy,
    },
  };
}

export function lockEdge(id: string, projectId: string, isLocked: boolean, isLockedBy: string): Types.LockEdge {
  return {
    type: Types.LOCK_EDGE,
    payload: {
      id: id,
      projectId,
      isLocked,
      isLockedBy,
    },
  };
}

export function lockAttribute(
  id: string,
  projectId: string,
  isLocked: boolean,
  isLockedBy: string
): Types.LockAttribute {
  return {
    type: Types.LOCK_ATTRIBUTE,
    payload: {
      id: id,
      projectId,
      isLocked,
      isLockedBy,
    },
  };
}

export function setIsLockedNode(lockNodeAm: LockNodeAm): Types.SetLockNode {
  return {
    type: Types.SET_LOCK_NODE,
    payload: {
      id: lockNodeAm.id,
      isLocked: lockNodeAm.isLocked,
      isLockedBy: lockNodeAm.isLockedStatusBy,
    },
  };
}

export function setIsLockedEdge(lockEdgeAm: LockEdgeAm): Types.SetLockEdge {
  return {
    type: Types.SET_LOCK_EDGE,
    payload: {
      id: lockEdgeAm.id,
      isLocked: lockEdgeAm.isLocked,
      isLockedBy: lockEdgeAm.isLockedStatusBy,
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
      isLockedBy: lockAttributeAm.isLockedStatusBy,
    },
  };
}

export function setIsLockedTransportAttribute(
  lockAttributeAm: LockAttributeAm
): Types.SetLockTransportAttribute {
  return {
    type: Types.SET_LOCK_TRANSPORT_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      transportId: lockAttributeAm.transportId,
      isLocked: lockAttributeAm.isLocked,
      isLockedBy: lockAttributeAm.isLockedStatusBy,
    },
  };
}

export function setIsLockedInterfaceAttribute(
  lockAttributeAm: LockAttributeAm
): Types.SetLockInterfaceAttribute {
  return {
    type: Types.SET_LOCK_INTERFACE_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      interfaceId: lockAttributeAm.interfaceId,
      isLocked: lockAttributeAm.isLocked,
      isLockedBy: lockAttributeAm.isLockedStatusBy,
    },
  };
}

export function setIsLockedNodeTerminalAttribute(
  lockAttributeAm: LockAttributeAm
): Types.SetLockNodeTerminalAttribute {
  return {
    type: Types.SET_LOCK_NODE_TERMINAL_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      terminalId: lockAttributeAm.terminalId,
      nodeId: lockAttributeAm.nodeId,
      isLocked: lockAttributeAm.isLocked,
      isLockedBy: lockAttributeAm.isLockedStatusBy,
    },
  };
}
export function setIsLockedTransportTerminalAttribute(
  lockAttributeAm: LockAttributeAm
): Types.SetLockTransportTerminalAttribute {
  return {
    type: Types.SET_LOCK_TRANSPORT_TERMINAL_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      terminalId: lockAttributeAm.terminalId,
      transportId: lockAttributeAm.transportId,
      isLocked: lockAttributeAm.isLocked,
      isLockedBy: lockAttributeAm.isLockedStatusBy,
    },
  };
}
export function setIsLockedInterfaceTerminalAttribute(
  lockAttributeAm: LockAttributeAm,
  edge: Edge
): Types.SetLockInterfaceTerminalAttribute {
  return {
    type: Types.SET_LOCK_INTERFACE_TERMINAL_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      terminalId: lockAttributeAm.terminalId,
      interfaceId: lockAttributeAm.interfaceId,
      isLocked: lockAttributeAm.isLocked,
      isLockedBy: lockAttributeAm.isLockedStatusBy,
    },
  };
}

export function setIsLockedCompositeAttribute(
  lockAttributeAm: LockAttributeAm
): Types.SetLockCompositeAttribute {
  return {
    type: Types.SET_LOCK_COMPOSITE_ATTRIBUTE,
    payload: {
      id: lockAttributeAm.id,
      compositeId: lockAttributeAm.compositeId,
      nodeId: lockAttributeAm.nodeId,
      isLocked: lockAttributeAm.isLocked,
      isLockedBy: lockAttributeAm.isLockedStatusBy,
    },
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
