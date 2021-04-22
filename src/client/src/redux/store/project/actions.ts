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
    CHANGE_NODE_VISIBILITY,
    CHANGE_EDGE_VISIBILITY,
    CHANGE_ACTIVE_NODE,
    ProjectActionTypes,
} from "./types";

import { Project } from '../../../models/project';

import { Node, Edge, NodeType } from "../../../models/project";

export function save(project: Project): ProjectActionTypes {
    return {
        type: SAVE_PROJECT,
        payload: project
    }
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
            description: description
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

export function changeNodeVisibility(
    nodeId: string,
    isHidden: boolean,
    isAspect: boolean,
    isParent: boolean,
    type: NodeType
) {
    return {
        type: CHANGE_NODE_VISIBILITY,
        payload: { nodeId, isHidden, isAspect, isParent, type },
    };
}

export function changeEdgeVisibility(edgeId: string, isHidden: boolean) {
    return {
        type: CHANGE_EDGE_VISIBILITY,
        payload: { edgeId, isHidden: isHidden },
    };
}

export function changeActiveNode(nodeId: string) {
    return {
        type: CHANGE_ACTIVE_NODE,
        payload: { nodeId },
    };
}
