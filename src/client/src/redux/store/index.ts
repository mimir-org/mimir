import storage from "redux-persist/lib/storage/session";
import createSagaMiddleware from "redux-saga";
import typeEditorReducer from "../../typeEditor/redux/typeEditorSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { libraryReducer } from "./library/reducers";
import { userReducer } from "./user/reducers";
import { projectReducer } from "./project/reducers";
import { inspectorReducer } from "../../modules/inspector/redux/tabs/reducers";
import { inspectorHeightReducer } from "../../modules/inspector/redux/height/reducers";
import { moduleReducer } from "./modules/reducers";
import { menuReducer } from "../../components/menus/projectMenu/subMenus/redux/reducers";
import { commonReducer } from "./common/reducers";
import { flowReducer } from "./flow/reducers";
import { secondaryReducer } from "./secondaryNode/reducers";
import { darkModeReducer } from "./darkMode/reducers";
import { parametersReducer } from "../../modules/inspector/tabs/parameters/redux/reducers";
import { electroViewReducer } from "./electro/reducers";
import { validationReducer } from "./validation/reducers";
import { rootSaga } from "../sagas";
import { customCategoryReducer } from "./customCategory/reducers";
import { edgeAnimationReducer } from "./edgeAnimation/reducers";
import { location3DReducer } from "../../modules/location/redux/reducers";
import { blockElementsReducer } from "../../modules/explorer/redux/reducers";
import { blockNodeSizeReducer } from "../../components/flow/block/redux/reducers";
import { persistStore, persistReducer } from 'redux-persist'

const rootReducers = combineReducers({
  library: libraryReducer,
  typeEditor: typeEditorReducer,
  inspector: inspectorReducer,
  inspectorHeight: inspectorHeightReducer,
  userState: userReducer,
  projectState: projectReducer,
  modules: moduleReducer,
  menu: menuReducer,
  flow: flowReducer,
  secondaryNode: secondaryReducer,
  electro: electroViewReducer,
  commonState: commonReducer,
  darkMode: darkModeReducer,
  parametersReducer: parametersReducer,
  customCategory: customCategoryReducer,
  blockNodeSize: blockNodeSizeReducer,
  edgeAnimation: edgeAnimationReducer,
  location3D: location3DReducer,
  blockElements: blockElementsReducer,
  validation: validationReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["typeEditor", "inspectorHeight"],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  devTools: (process.env.NODE_ENV !== "production" && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // TODO: Re-enable checks after rewrite of most reducers/actions
      immutableCheck: false,
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      // },
    }).concat(sagaMiddleware),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
export * from "./hooks";
export * from "./selectors";

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };

sagaMiddleware.run(rootSaga);
