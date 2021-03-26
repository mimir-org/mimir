import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { workspaceReducer } from "./workspace/reducers";
import { nodetypeReducer } from "./nodetypes/reducers";
import { userReducer } from "./user/reducers";
import { projectReducer } from "./project/reducers";
import { sagas } from "../sagas";
import aspectReducer from "../testing/aspectReducer";
import inspectorReducer from "../inspector/reducers/inspectorReducer";
import showInspectorReducer from "../inspector/reducers/showInspectorReducer";
import showLibraryReducer from "../library/reducers/showLibraryReducer";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

const rootReducers = combineReducers({
  inspectorReducer: inspectorReducer,
  showInspectorReducer: showInspectorReducer,
  showLibraryReducer: showLibraryReducer,
  testReducer: aspectReducer,
  workspace: workspaceReducer,
  nodetype: nodetypeReducer,
  user: userReducer,
  projeject: projectReducer
});

const store = createStore(
  rootReducers,
  {},
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof rootReducers>;
export default store;
