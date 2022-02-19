import { configureStore } from "@reduxjs/toolkit";
import loggedUserReducer from "./reducers/loggedUser";

export default configureStore({
  reducer: {
    loggedUser: loggedUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});