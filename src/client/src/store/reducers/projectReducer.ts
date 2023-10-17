import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project } from "lib";

// State definition
/**
 * Project state
 * @property {string[]} fetching - List of fetching actions
 * @property {boolean} creating - Is creating project
 * @property {boolean} isLocking - Is locking project
 * @property {Project} project - Project
 * @property {Project[]} projectList - List of projects
 */
export interface ProjectState {
  fetching: string[];
  creating: boolean;
  isLocking: boolean;
  project: Project | null;
  projectList: Project[];
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

export interface UpdateProjectAction {
  project: Project;
}

export interface UpdateProjectActionFinished {
  statusCode: string;
}

// Initial state
const initState: ProjectState = {
  fetching: [],
  creating: false,
  isLocking: false,
  project: null,
  projectList: [],
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
    updateProject: (state, action: PayloadAction<UpdateProjectAction>) => {
      state.project = clone(action.payload.project);
    },
    updateProjectFinished: (state, action: PayloadAction<UpdateProjectActionFinished>) => {
      console.log("statuscode: " + action.payload.statusCode + state.project.id + " is saved!");
    },
  },
});

export const { fetchProject, fetchProjectFinished, fetchProjects, fetchProjectsFinished, createProject, updateProject, updateProjectFinished } =
  projectSlice.actions;
export default projectSlice.reducer;
