import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project, ProjectItem } from "lib";

// State definition
export interface IProjectState {
  fetching: string[];
  creating: boolean;
  isLocking: boolean;
  project: Project | null;
  projectList: ProjectItem[];
}

// Payload action
export interface FetchProjectAction {
  url: string;
}

export interface FetchProjectFinishedAction {
  project: Project;
}

export interface FetchProjectsAction {
  name: string;
}

export interface FetchProjectsFinishedAction {
  projects: ProjectItem[];
}

// Initial state
const initState: IProjectState = {
  fetching: [],
  creating: false,
  isLocking: false,
  project: null,
  projectList: [],
};

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
  },
});

export const { fetchProject, fetchProjectFinished, fetchProjects, fetchProjectsFinished } = projectSlice.actions;
export default projectSlice.reducer;
