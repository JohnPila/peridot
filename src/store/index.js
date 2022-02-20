import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./reducers/common";
import loggedUserReducer from "./reducers/loggedUser";

export default configureStore({
  reducer: {
    loggedUser: loggedUserReducer,
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});