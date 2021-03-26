import {
    FETCHING_PROJECT,
    CREATING_PROJECT,
    ADD_NODE,
    ProjectActionTypes    
  } from './types';

  import { Node } from '../../../models/project';
  
  export function get(id: string): ProjectActionTypes {
    return {
      type: FETCHING_PROJECT,
      payload: {
        id: id
      }
    };
  }

  export function create(): ProjectActionTypes {
    return {
      type: CREATING_PROJECT,
      payload: {}      
    };
  }

  export function addNode(node: Node, parentId: string) {
    return {
      type: ADD_NODE,
      payload: {
        node: node,
        parentId: parentId
      }
    }
  }
  