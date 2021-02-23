import { all, takeEvery } from 'redux-saga/effects';
import { FETCHING_WORKSPACE } from './../store/workspace/types';
import { FETCHING_NODETYPES } from './../store/nodetypes/types';

import { getWorkspace } from './workspace/saga';
import { getNodetypes } from './nodetype/saga';

export function* sagas() {
    yield all ([
        takeEvery(FETCHING_WORKSPACE, getWorkspace),
        takeEvery(FETCHING_NODETYPES, getNodetypes)
    ]);
}