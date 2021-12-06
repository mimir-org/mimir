import * as Types from "./types";
import { Node, Edge, Project, CommitPackage, Attribute, Connector, Composite, ProjectFileAm, ProjectConverterAm } from "../../../models";

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
    payload: projectConverter

  };
}

export function importProjectAction(data: ProjectFileAm): Types.ProjectActionTypes {
  return {
    type: Types.IMPORT_PROJECT,
    payload: data,
  };
}

export function setIsLockedNode(node: Node, project: Project, isLocked: boolean, isLockedBy: string): Types.LockUnlockNode {
  return {
    type: Types.LOCK_UNLOCK_NODE,
    payload: {
      id: node.id,
      projectId: project.id,
      isLocked,
      isLockedBy,
    },
  };
}

export function setIsLockedNodeAttribute(
  attribute: Attribute,
  nodeId: string,
  isLocked: boolean,
  isLockedBy: string
): Types.LockUnlockNodeAttribute {
  return {
    type: Types.LOCK_UNLOCK_NODE_ATTRIBUTE,
    payload: {
      id: attribute.id,
      nodeId,
      isLocked,
      isLockedBy,
    },
  };
}

export function setIsLockedTransportAttribute(
  attribute: Attribute,
  edge: Edge,
  isLocked: boolean,
  isLockedBy: string
): Types.LockUnlockTransportAttribute {
  return {
    type: Types.LOCK_UNLOCK_TRANSPORT_ATTRIBUTE,
    payload: {
      id: attribute.id,
      edgeId: edge.id,
      isLocked,
      isLockedBy,
    },
  };
}

export function setIsLockedInterfaceAttribute(
  attribute: Attribute,
  edge: Edge,
  isLocked: boolean,
  isLockedBy: string
): Types.LockUnlockInterfaceAttribute {
  return {
    type: Types.LOCK_UNLOCK_INTERFACE_ATTRIBUTE,
    payload: {
      id: attribute.id,
      edgeId: edge.id,
      isLocked,
      isLockedBy,
    },
  };
}

export function setIsLockedNodeTerminalAttribute(
  attribute: Attribute,
  terminalId: string,
  node: Node,
  isLocked: boolean,
  isLockedBy: string
): Types.LockUnlockNodeTerminalAttribute {
  return {
    type: Types.LOCK_UNLOCK_NODE_TERMINAL_ATTRIBUTE,
    payload: {
      id: attribute.id,
      terminalId,
      nodeId: node.id,
      isLocked,
      isLockedBy,
    },
  };
}
export function setIsLockedTransportTerminalAttribute(
  attribute: Attribute,
  terminalId: string,
  edge: Edge,
  isLocked: boolean,
  isLockedBy: string
): Types.LockUnlockTransportTerminalAttribute {
  return {
    type: Types.LOCK_UNLOCK_TRANSPORT_TERMINAL_ATTRIBUTE,
    payload: {
      id: attribute.id,
      terminalId,
      edgeId: edge.id,
      isLocked,
      isLockedBy,
    },
  };
}
export function setIsLockedInterfaceTerminalAttribute(
  attribute: Attribute,
  terminalId: string,
  edge: Edge,
  isLocked: boolean,
  isLockedBy: string
): Types.LockUnlockInterfaceTerminalAttribute {
  return {
    type: Types.LOCK_UNLOCK_INTERFACE_TERMINAL_ATTRIBUTE,
    payload: {
      id: attribute.id,
      terminalId,
      isLocked,
      isLockedBy,
      edgeId: edge.id,
    },
  };
}

export function setIsLockedCompositeAttribute(
  attribute: Attribute,
  compositeId: string,
  node: Node,
  isLocked: boolean,
  isLockedBy: string
): Types.LockUnlockCompositeAttribute {
  return {
    type: Types.LOCK_UNLOCK_COMPOSITE_ATTRIBUTE,
    payload: {
      id: attribute.id,
      compositeId,
      nodeId: node.id,
      isLocked,
      isLockedBy,
    },
  };
}

export function setOffPageStatus(id: string, required: boolean): Types.ProjectActionTypes {
  return {
    type: Types.SET_OFFPAGE_STATUS,
    payload: {
      id: id,
      required: required,
    },
  };
}
