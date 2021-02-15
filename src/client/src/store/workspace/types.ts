import { Nodetype } from './../nodetypes/types'; 

export const FETCHING_WORKSPACE = 'FETCHING_WORKSPACE';
export const FETCHING_WORKSPACE_SUCCESS_OR_ERROR = 'FETCHING_WORKSPACE_SUCCESS_OR_ERROR';

// Enum types
export enum PortType {"In" = 0, "Out" = 1, "Mixed" = 2};

// Model types
export interface Port {
    name: string,
    type: PortType
}

export interface Node {
    id: string,
    name: string,
    x: number,
    y: number,
    ports: Port[],
    nodeType: Nodetype    
}

export interface Workspace {
    id: number,
    name: string,
    nodes: Node[],
    // types: Nodetype[]
}

// State types
export interface WorkspaceState {
    fetching: boolean,
    workspace: Workspace | null,
    hasError: boolean,
    errorMsg: string | null
}

// Action types
interface FetchWorkspaceAction {
    type: typeof FETCHING_WORKSPACE,
    payload: WorkspaceState
}

interface FetchWorkspaceActionFinished {
    type: typeof FETCHING_WORKSPACE_SUCCESS_OR_ERROR,
    payload: WorkspaceState
}

export type WorkspaceActionTypes = FetchWorkspaceAction | FetchWorkspaceActionFinished
