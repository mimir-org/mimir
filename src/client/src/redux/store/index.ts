import createSagaMiddleware from "redux-saga";
import typeEditorReducer from "../../typeEditor/redux/typeEditorSlice";
import inspectorReducer from "../../modules/inspector/redux/inspectorSlice";
import userReducer from "./user/userSlice";
import modulesReducer from "./modules/modulesSlice";
import menuReducer from "../../components/menus/projectMenu/components/subMenus/redux/menuSlice";
import flowReducer from "./flow/flowSlice";
import electroReducer from "./electro/electroSlice";
import commonReducer from "./common/commonSlice";
import darkModeReducer from "./darkMode/darkModeSlice";
import parametersReducer from "../../modules/inspector/components/tabs/components/parameters/redux/parametersSlice";
import customCategoryReducer from "./customCategory/customCategorySlice";
import location3DReducer from "../../modules/location/redux/location3DSlice";
import validationReducer from "./validation/validationSlice";
import blockNodeSizeReducer from "../../components/flow/block/redux/blockNodeSizeSlice";
import libraryReducer from "./library/librarySlice";
import edgeAnimationReducer from "./edgeAnimation/edgeAnimationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { projectReducer } from "./project/reducers";
import { secondaryReducer } from "./secondaryNode/reducers";
import { rootSaga } from "../sagas";

const rootReducers = combineReducers({
  library: libraryReducer,
  typeEditor: typeEditorReducer,
  inspector: inspectorReducer,
  userState: userReducer,
  projectState: projectReducer,
  modules: modulesReducer,
  menu: menuReducer,
  flow: flowReducer,
  secondaryNode: secondaryReducer,
  electro: electroReducer,
  commonState: commonReducer,
  darkMode: darkModeReducer,
  parameters: parametersReducer,
  customCategory: customCategoryReducer,
  blockNodeSize: blockNodeSizeReducer,
  edgeAnimation: edgeAnimationReducer,
  location3D: location3DReducer,
  validation: validationReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== "production" && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"],
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

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
export * from "./hooks";
export * from "./selectors";
export default { store };

sagaMiddleware.run(rootSaga);
