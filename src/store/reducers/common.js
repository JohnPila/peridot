import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    showBanner: false,
  },
  reducers: {
    setShowBanner: (state, action) => {
      state.showBanner = action.payload;
    },
  },
});

export const {
    setShowBanner,
} = commonSlice.actions;

export default commonSlice.reducer;