import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Project, ProjectItemCm } from "lib";

// State definition
export interface IProjectState {
  fetching: string[];
  creating: boolean;
  isLocking: boolean;
  project: Project;
  projectList: ProjectItemCm[];
}

// Payload action
export interface FetchProjectAction {
  url: string;
}

export interface FetchProjectFinishedAction {
  project: Project;
}

// Initial state
const initState: IProjectState = {
  fetching: [],
  creating: false,
  isLocking: false,
  project: null,
  projectList: null,
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
  },
});

export const { fetchProject, fetchProjectFinished } = projectSlice.actions;
export default projectSlice.reducer;
