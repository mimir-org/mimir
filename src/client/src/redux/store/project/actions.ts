import { Project } from "../../../models/project";
import { Node, Edge, NodeType } from "../../../models/project";
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
    CHANGE_NODE_VISIBILITY,
    CHANGE_ACTIVE_NODE,
    CHANGE_SELECTED_PROJECT,
    ProjectActionTypes,
    CHANGE_ALL_NODES,
    CHANGE_NODE_PROP_VALUE
} from "./types";

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

export function changeNodeVisibility(
    node: Node,
    isParent: boolean,
    type: NodeType
) {
    return {
        type: CHANGE_NODE_VISIBILITY,
        payload: { node, isParent, type },
    };
}

export function changeActiveNode(nodeId: string) {
    return {
        type: CHANGE_ACTIVE_NODE,
        payload: { nodeId },
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

export function changeNodeValue(nodeId: string, propName: string, propValue: any) {
    return {
        type: CHANGE_NODE_PROP_VALUE,
        payload: {
            nodeId,
            propName,
            propValue
        }
    }
}

