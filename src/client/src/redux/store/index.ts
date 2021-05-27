import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { libraryReducer } from "./library/reducers";
import { userReducer } from "./user/reducers";
import { projectReducer } from "./project/reducers";
import { inspectorReducer } from "./inspector/reducers";
import { moduleReducer } from "./modules/reducers";
import { projectMenuReducer } from "./projectMenu/reducers";
import { commonReducer } from "./common/reducers";
import { flowReducer } from "./flow/reducers";
import { splitViewReducer } from "./splitView/reducers";
import { sagas } from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
    (process.env.NODE_ENV !== "production" &&
        window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
    compose;

const rootReducers = combineReducers({
    library: libraryReducer,
    inspector: inspectorReducer,
    userState: userReducer,
    projectState: projectReducer,
    modules: moduleReducer,
    projectMenu: projectMenuReducer,
    flow: flowReducer,
    splitView: splitViewReducer,
    commonState: commonReducer
});

const store = createStore(
    rootReducers,
    {},
    composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof rootReducers>;
export default store;
