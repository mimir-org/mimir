import { call, put } from 'redux-saga/effects';
import { FETCHING_PROJECT_SUCCESS_OR_ERROR, CREATING_PROJECT_SUCCESS_OR_ERROR, ProjectState } from '../../store/project/types';
import ProjectDataset from '../../../data/ProjectDataset';
import { Project } from '../../../models/project';

export function* getProject(action) {
    try {
        const data = yield call(ProjectDataset.get, action.payload);
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
        const data = yield call(ProjectDataset.create);
        const project = data as Project;
        
        const payload = {
            project: project,
            hasError: false,
            errorMsg: null,
            fetching: false,
            creating: false
        };

        yield put({
            type: CREATING_PROJECT_SUCCESS_OR_ERROR,
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
            type: CREATING_PROJECT_SUCCESS_OR_ERROR,
            payload: payload as ProjectState
        });
    }
}
