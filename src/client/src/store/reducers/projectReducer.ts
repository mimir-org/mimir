import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateId, Project } from "lib";
import { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "../../lib/interfaces/ApiError";

// State definition
/**
 * Project state
 * @property {string[]} fetching - List of fetching actions
 * @property {boolean} saving - Is saving project
 * @property {boolean} isLocking - Is locking project
 * @property {Project} project - Project
 * @property {Project[]} projectList - List of projects
 */
export interface ProjectState {
  fetching: string[];
  saving: string[];
  isLocking: boolean;
  project: Project | null;
  projectList: Project[];
  apiErrors: ApiError[];
}

// Payload action
export interface FetchProjectAction {
  id: string;
}

export interface FetchProjectFinishedAction {
  project: Project;
}

export interface FetchProjectsAction {
  name: string;
}

export interface FetchProjectsFinishedAction {
  projects: Project[];
}

export interface CreateProjectAction {
  project: Project;
}

export interface saveProjectToDbAction {
  project: Project;
}

export interface saveProjectToDbFinishedAction {
  guid: string;
}

export interface updateProjectDbAction {
  project: Project;
}

export interface updateProjectDbFinishedAction {
  response: AxiosResponse;
}

export interface apiErrorAction {
  error: AxiosError;
}

// Initial state
const initState: ProjectState = {
  fetching: [],
  saving: [],
  isLocking: false,
  project: null,
  projectList: [],
  apiErrors: [],
};

function clone<T>(instance: T): T {
  const copy = new (instance.constructor as { new (): T })();
  Object.assign(copy, instance);
  return copy;
}

export const projectSlice = createSlice({
  name: "project",
  initialState: initState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchProject: (state, action: PayloadAction<FetchProjectAction>) => {
      state.fetching.push(fetchProject.type);
      state.project = null;
    },
    fetchProjectFinished: (state, action: PayloadAction<FetchProjectFinishedAction>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchProject.type);
      state.project = action.payload.project;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchProjects: (state, action: PayloadAction<FetchProjectsAction>) => {
      state.fetching.push(fetchProjects.type);
      state.project = null;
    },
    fetchProjectsFinished: (state, action: PayloadAction<FetchProjectsFinishedAction>) => {
      state.fetching = state.fetching.filter((elem) => elem !== fetchProjects.type);
      state.projectList = action.payload.projects;
    },
    createProject: (state, action: PayloadAction<CreateProjectAction>) => {
      state.project = clone(action.payload.project);
    },
    updateProject: (state, action: PayloadAction<CreateProjectAction>) => {
      state.project = clone(action.payload.project);
    },
    saveProjectInDb: (state, action: PayloadAction<saveProjectToDbAction>) => {
      state.saving.push(saveProjectInDb.type);
    },
    saveProjectDbFinished: (state, action: PayloadAction<saveProjectToDbFinishedAction>) => {
      state.project.id = action.payload.guid;
      state.saving = state.saving.filter((elem) => elem !== saveProjectInDb.type);
    },
    updateProjectInDb: (state, action: PayloadAction<updateProjectDbAction>) => {
      state.saving.push(saveProjectInDb.type);
    },
    updateProjectInDbFinished: (state, action: PayloadAction<updateProjectDbFinishedAction>) => {
      state.saving = state.saving.filter((elem) => elem !== saveProjectInDb.type);
    },
    setProjectApiError: (state, action: PayloadAction<apiErrorAction>) => {
      state.apiErrors.push({ id: CreateId(), error: action.payload.error });
    },
    deleteProjectApiError: (state, action: PayloadAction<string>) => {
      state.apiErrors = state.apiErrors.filter((error) => error.id !== action.payload);
      // Deleting saving array when user acknowledges that there has been an error saving the project.
      if (state.saving.length > 0) {
        state.saving = [];
      }
    },
  },
});

export const {
  fetchProject,
  fetchProjectFinished,
  fetchProjects,
  fetchProjectsFinished,
  createProject,
  updateProject,
  saveProjectInDb,
  saveProjectDbFinished,
  updateProjectInDb,
  updateProjectInDbFinished,
  setProjectApiError,
  deleteProjectApiError,
} = projectSlice.actions;
export default projectSlice.reducer;
