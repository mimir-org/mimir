import { Node, Edge, Project, CommitPackage, Attribute } from "../../../models";
import { ProjectAm } from "../../sagas/project/ConvertProject";
import {
  SAVE_PROJECT,
  FETCHING_PROJECT,
  CREATING_PROJECT,
  SEARCH_PROJECT,
  ADD_NODE,
  REMOVE_NODE,
  ADD_EDGE,
  REMOVE_EDGE,
  UPDATE_POSITION,
  UPDATE_BLOCK_POSITION,
  SET_NODE_VISIBILITY,
  SET_ACTIVE_NODE,
  CHANGE_SELECTED_PROJECT,
  ProjectActionTypes,
  CHANGE_ALL_NODES,
  CHANGE_NODE_PROP_VALUE,
  CHANGE_ATTRIBUTE_VALUE,
  CHANGE_CONNECTOR_ATTRIBUTE_VALUE,
  SET_EDGE_VISIBILITY,
  SET_ACTIVE_BLOCKNODE,
  DELETE_PROJECT_ERROR,
  CHANGE_ACTIVE_CONNECTOR,
  SET_ACTIVE_EDGE,
  EXPORT_PROJECT_TO_FILE,
  IMPORT_PROJECT,
  COMMIT_PROJECT,
  LOCK_UNLOCK_NODE,
  LOCK_UNLOCK_ATTRIBUTE,
} from "./types";

export function commitProject(
  commitPackage: CommitPackage
): ProjectActionTypes {
  return {
    type: COMMIT_PROJECT,
    payload: commitPackage,
  };
}

export function save(project: Project): ProjectActionTypes {
  return {
    type: SAVE_PROJECT,
    payload: project,
  };
}

export function get(id: string): ProjectActionTypes {
  return {
    type: FETCHING_PROJECT,
    payload: id,
  };
}

export function search(name: string): ProjectActionTypes {
  return {
    type: SEARCH_PROJECT,
    payload: name,
  };
}

export function create(name: string, description: string): ProjectActionTypes {
  return {
    type: CREATING_PROJECT,
    payload: {
      name: name,
      description: description,
      version: "1.0",
    },
  };
}

export function addNode(node: Node): ProjectActionTypes {
  return {
    type: ADD_NODE,
    payload: node,
  };
}

export function removeNode(nodeId: string): ProjectActionTypes {
  return {
    type: REMOVE_NODE,
    payload: nodeId,
  };
}

export function createEdge(edge: Edge): ProjectActionTypes {
  return {
    type: ADD_EDGE,
    payload: edge,
  };
}

export function removeEdge(edgeId: string): ProjectActionTypes {
  return {
    type: REMOVE_EDGE,
    payload: edgeId,
  };
}

export function updatePosition(
  nodeId: string,
  x: number,
  y: number
): ProjectActionTypes {
  return {
    type: UPDATE_POSITION,
    payload: {
      nodeId: nodeId,
      x: x,
      y: y,
    },
  };
}

export function updateBlockPosition(
  nodeId: string,
  x: number,
  y: number
): ProjectActionTypes {
  return {
    type: UPDATE_BLOCK_POSITION,
    payload: {
      nodeId: nodeId,
      x: x,
      y: y,
    },
  };
}

export function setNodeVisibility(node: Node, isParent: boolean) {
  return {
    type: SET_NODE_VISIBILITY,
    payload: { node, isParent },
  };
}

export function setEdgeVisibility(edge: Edge, isHidden: boolean) {
  return {
    type: SET_EDGE_VISIBILITY,
    payload: { edge, isHidden },
  };
}

export function setActiveNode(nodeId: string, isActive: boolean) {
  return {
    type: SET_ACTIVE_NODE,
    payload: { nodeId, isActive },
  };
}

export function setActiveBlockNode(nodeId: string) {
  return {
    type: SET_ACTIVE_BLOCKNODE,
    payload: { nodeId },
  };
}

export function setActiveEdge(edgeId: string, isActive: boolean) {
  return {
    type: SET_ACTIVE_EDGE,
    payload: { edgeId, isActive },
  };
}

export function changeSelectedProject(projectId: string) {
  return {
    type: CHANGE_SELECTED_PROJECT,
    payload: { projectId },
  };
}

export function changeAllNodes(visible: boolean) {
  return {
    type: CHANGE_ALL_NODES,
    payload: visible,
  };
}

export function changeNodeValue(
  nodeId: string,
  propName: string,
  propValue: any
) {
  return {
    type: CHANGE_NODE_PROP_VALUE,
    payload: {
      nodeId,
      propName,
      propValue,
    },
  };
}

export function changeAttributeValue(
  id: string,
  value: string,
  unit: string,
  nodeId: string
) {
  return {
    type: CHANGE_ATTRIBUTE_VALUE,
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
    type: CHANGE_CONNECTOR_ATTRIBUTE_VALUE,
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
    type: DELETE_PROJECT_ERROR,
    payload: {
      key,
    },
  };
}

export function changeActiveConnector(
  node: Node,
  connectorId: string,
  visible: boolean,
  order: number
) {
  return {
    type: CHANGE_ACTIVE_CONNECTOR,
    payload: {
      node,
      connectorId,
      visible,
      order,
    },
  };
}

export function exportProjectToFile(
  project: Project,
  fileName: string,
  isSubProject: boolean
) {
  return {
    type: EXPORT_PROJECT_TO_FILE,
    payload: {
      project: project,
      fileName: fileName,
      isSubProject: isSubProject,
    },
  };
}

export function importProjectAction(project: ProjectAm) {
  return {
    type: IMPORT_PROJECT,
    payload: project,
  };
}

export function lockUnlockNode(
  node: Node,
  project: Project,
  isLocked: boolean
) {
  return {
    type: LOCK_UNLOCK_NODE,
    payload: {
      id: node.id,
      projectId: project.id,
      isLocked,
    },
  };
}

export function lockUnlockAttribute(
  attribute: Attribute,
  nodeId: string,
  isLocked: boolean
) {
  return {
    type: LOCK_UNLOCK_ATTRIBUTE,
    payload: {
      id: attribute.id,
      nodeId,
      isLocked,
    },
  };
}
