import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { libraryReducer } from "./library/reducers";
import { typeEditorReducer } from "./typeEditor/reducers";
import { userReducer } from "./user/reducers";
import { projectReducer } from "./project/reducers";
import { inspectorReducer } from "../../modules/inspector/redux/reducers";
import { moduleReducer } from "./modules/reducers";
import { menuReducer } from "./projectMenu/reducers";
import { commonReducer } from "./common/reducers";
import { flowReducer } from "./flow/reducers";
import { splitViewReducer } from "./splitView/reducers";
import { connectViewReducer } from "./connectView/reducers";
import { darkModeReducer } from "./darkMode/reducers";
import { sagas } from "../sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]) ||
  compose;

const rootReducers = combineReducers({
  library: libraryReducer,
  typeEditor: typeEditorReducer,
  inspector: inspectorReducer,
  userState: userReducer,
  projectState: projectReducer,
  modules: moduleReducer,
  menu: menuReducer,
  flow: flowReducer,
  splitView: splitViewReducer,
  connectView: connectViewReducer,
  commonState: commonReducer,
  darkMode: darkModeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["typeEditor"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
  persistedReducer,
  {},
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducers>;
// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };

sagaMiddleware.run(sagas);
