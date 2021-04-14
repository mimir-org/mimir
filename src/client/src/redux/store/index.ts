import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { libraryReducer } from "./library/reducers";
import { userReducer } from "./user/reducers";
import { projectReducer } from "./project/reducers";
import { sagas } from "../sagas";
import inspectorReducer from "../inspector/reducers/inspectorReducer";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

const rootReducers = combineReducers({
  inspectorReducer: inspectorReducer,
  library: libraryReducer,
  userState: userReducer,
  projectState: projectReducer,
});

const store = createStore(
  rootReducers,
  {},
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof rootReducers>;
export default store;
