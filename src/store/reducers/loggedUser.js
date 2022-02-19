import { createSlice } from "@reduxjs/toolkit";

export const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: {
    // not yet initialized
    user: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  setUser,
} = loggedUserSlice.actions;

export default loggedUserSlice.reducer;