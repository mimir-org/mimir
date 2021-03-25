import {
    FETCHING_PROJECT,
    CREATING_PROJECT,
    ProjectActionTypes    
  } from './types';
  
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
  