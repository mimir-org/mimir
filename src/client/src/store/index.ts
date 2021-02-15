import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { workspaceReducer } from './workspace/reducers';
import { nodetypeReducer } from './nodetypes/reducers';
import { treeviewReducer } from './treeview/reducers';
import { sagas } from './../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) || compose;

const rootReducers = combineReducers({
    workspace: workspaceReducer,
    nodetype: nodetypeReducer,
    treeview: treeviewReducer
});

const store = createStore(
    rootReducers,
    {},
    composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof rootReducers>;
export default store;
