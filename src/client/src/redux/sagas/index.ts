import { all, takeEvery } from 'redux-saga/effects';
import { FETCHING_WORKSPACE } from './../store/workspace/types';
import { FETCHING_LIBRARY } from '../store/library/types';
import { FETCHING_USER } from './../store/user/types';
import { CREATING_PROJECT, FETCHING_PROJECT } from './../store/project/types';

import { getWorkspace } from './workspace/saga';
import { searchLibrary } from './library/saga';
import { getUser } from './user/saga';
import { getProject, createProject } from './project/saga';

export function* sagas() {
  yield all([
    takeEvery(FETCHING_WORKSPACE, getWorkspace),
    takeEvery(FETCHING_LIBRARY, searchLibrary),
    takeEvery(FETCHING_USER, getUser),
    takeEvery(CREATING_PROJECT, createProject),
    takeEvery(FETCHING_PROJECT, getProject)
  ]);
}
