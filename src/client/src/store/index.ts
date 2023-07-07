import createSagaMiddleware from "redux-saga";
import { sagas } from "./sagas";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import libraryReducer from "store/reducers/libraryReducer";
import projectReducer from "store/reducers/projectReducer";
import commonReducer from "store/reducers/commonReducer";

const rootReducers = combineReducers({
  library: libraryReducer,
  projectState: projectReducer,
  commonState: commonReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  devTools: process.env.NODE_ENV !== "production" && window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // TODO: Re-enable checks after rewrite of most reducers/actions
      immutableCheck: true,
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      // },
    }).concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(sagas);

export { typedJsonSetting } from "./webclient/typedJsonSettings";
export * from "./hooks";
export * from "./selectors";
export default store;
