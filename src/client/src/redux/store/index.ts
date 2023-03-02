import createSagaMiddleware from "redux-saga";
import menuReducer from "../../components/menus/projectMenu/components/subMenus/redux/menuSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { rootSaga } from "../sagas";
import commonReducer from "./commonSlice";

const rootReducers = combineReducers({
  menu: menuReducer,
  commonState: commonReducer,
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
export default { store };

sagaMiddleware.run(rootSaga);
