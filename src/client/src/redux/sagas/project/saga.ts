import { call, put } from "redux-saga/effects";
import {
    FETCHING_PROJECT_SUCCESS_OR_ERROR,
    CREATING_PROJECT_SUCCESS_OR_ERROR,
    ProjectState,
    ProjectActionTypes,
} from "../../store/project/types";
import ProjectDataset from "../../../data/ProjectDataset";
import { Project } from '../../../models/project';

export function* getProject(action: { id: string }) {
    try {
        const data = yield call(ProjectDataset.get, action.id);
        const project = data as Project;

        const payload = {
            project: project,
            hasError: false,
            errorMsg: null,
            fetching: false,
            creating: false
        };

        yield put({
            type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
            payload: payload as ProjectState
        });
    } catch (error) {

        const payload = {
            project: null,
            hasError: true,
            errorMsg: error,
            fetching: false,
            creating: false
        };

        yield put({
            type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
            payload: payload as ProjectState
        });
    }
}

export function* createProject() {
    try {
        
        const project: Project =
        {
            id: "1",
            name: "Noaka",
            description: "Noaka description",
            function: {
                name: "Function",
                children: []
            },
            product: {
                name: "Product",
                children: []
            },
            location: {
                name: "Location",
                children: []
            }
        };


        const payload = {
            project: project,
            hasError: false,
            errorMsg: null,
            fetching: false,
            creating: false
        };

        yield put({
            type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
            payload: payload as ProjectState
        });
    } catch (error) {

        const payload = {
            project: null,
            hasError: true,
            errorMsg: error,
            fetching: false,
            creating: false
        };

        yield put({
            type: FETCHING_PROJECT_SUCCESS_OR_ERROR,
            payload: payload as ProjectState
        });
    }
}
