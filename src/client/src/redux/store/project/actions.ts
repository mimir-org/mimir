import * as Types from "./types";
import { Node, Edge, Project, CommitPackage, Attribute } from "../../../models";
import { ProjectAm } from "../../sagas/project/ConvertProject";

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

export function setNodeVisibility(node: Node, isParent: boolean) {
  return {
    type: Types.SET_NODE_VISIBILITY,
    payload: { node, isParent },
  };
}

export function setEdgeVisibility(edge: Edge, isHidden: boolean) {
  return {
    type: Types.SET_EDGE_VISIBILITY,
    payload: { edge, isHidden },
  };
}

export function setActiveNode(nodeId: string, isActive: boolean) {
  return {
    type: Types.SET_ACTIVE_NODE,
    payload: { nodeId, isActive },
  };
}

export function setActiveBlockNode(nodeId: string) {
  return {
    type: Types.SET_ACTIVE_BLOCKNODE,
    payload: { nodeId },
  };
}

export function setActiveEdge(edgeId: string, isActive: boolean) {
  return {
    type: Types.SET_ACTIVE_EDGE,
    payload: { edgeId, isActive },
  };
}

export function changeSelectedProject(projectId: string) {
  return {
    type: Types.CHANGE_SELECTED_PROJECT,
    payload: { projectId },
  };
}

export function changeAllNodes(visible: boolean) {
  return {
    type: Types.CHANGE_ALL_NODES,
    payload: visible,
  };
}

export function changeNodeValue(nodeId: string, propName: string, propValue: any) {
  return {
    type: Types.CHANGE_NODE_PROP_VALUE,
    payload: {
      nodeId,
      propName,
      propValue,
    },
  };
}

export function changeAttributeValue(id: string, value: string, unit: string, nodeId: string) {
  return {
    type: Types.CHANGE_ATTRIBUTE_VALUE,
    payload: {
      id,
      value,
      unit,
      nodeId,
    },
  };
}

export function changeConnectorAttributeValue(
  id: string,
  value: string,
  unit: string,
  nodeId: string,
  connectorId: string
) {
  return {
    type: Types.CHANGE_CONNECTOR_ATTRIBUTE_VALUE,
    payload: {
      id,
      value,
      unit,
      nodeId,
      connectorId,
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

export function changeActiveConnector(node: Node, connectorId: string, visible: boolean, order: number) {
  return {
    type: Types.CHANGE_ACTIVE_CONNECTOR,
    payload: {
      node,
      connectorId,
      visible,
      order,
    },
  };
}

export function exportProjectToFile(project: Project, fileName: string, isSubProject: boolean) {
  return {
    type: Types.EXPORT_PROJECT_TO_FILE,
    payload: {
      project: project,
      fileName: fileName,
      isSubProject: isSubProject,
    },
  };
}

export function importProjectAction(project: ProjectAm) {
  return {
    type: Types.IMPORT_PROJECT,
    payload: project,
  };
}

export function setIsLockedNode(node: Node, project: Project, isLocked: boolean) {
  return {
    type: Types.LOCK_UNLOCK_NODE,
    payload: {
      id: node.id,
      projectId: project.id,
      isLocked,
    },
  };
}

export function setIsLockedNodeAttribute(attribute: Attribute, nodeId: string, isLocked: boolean) {
  return {
    type: Types.LOCK_UNLOCK_NODE_ATTRIBUTE,
    payload: {
      id: attribute.id,
      nodeId,
      isLocked,
    },
  };
}

export function setIsLockedTerminalAttribute(attribute: Attribute, terminalId: string, isLocked: boolean) {
  return {
    type: Types.LOCK_UNLOCK_TERMINAL_ATTRIBUTE,
    payload: {
      id: attribute.id,
      terminalId,
      isLocked,
    },
  };
}
