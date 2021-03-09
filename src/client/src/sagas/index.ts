import { all, takeEvery } from 'redux-saga/effects';
import { FETCHING_WORKSPACE } from './../store/workspace/types';
import { FETCHING_NODETYPES } from './../store/nodetypes/types';
import { FETCHING_USER } from './../store/user/types';

import { getWorkspace } from './workspace/saga';
import { getNodetypes } from './nodetype/saga';
import { getUser } from './user/saga';

export function* sagas() {
    yield all ([
        takeEvery(FETCHING_WORKSPACE, getWorkspace),
        takeEvery(FETCHING_NODETYPES, getNodetypes),
        takeEvery(FETCHING_USER, getUser)
    ]);
}