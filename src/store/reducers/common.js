import { createSlice } from "@reduxjs/toolkit";
import {DIALOG_TYPE} from "../../utils/constants";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    showBanner: false,
    dialog: {
      type: null,
      options: {},
      isOpen: false,
      title: "",
      content: "",
      callback: null,
    },
  },
  reducers: {
    setShowBanner: (state, action) => {
      state.showBanner = action.payload;
    },
    confirmDialog: {
      reducer: (state, action) => {
        const {title, content, callback, options} = action.payload;
        state.dialog = {
          type: DIALOG_TYPE.CONFIRM,
          options: options || {},
          isOpen: true,
          title,
          content,
          callback,
        };
      },
      prepare: (title, content, callback, options) => ({
        payload: {
          title,
          content,
          callback,
          options,
        },
      })
    },
    closeDialog: (state) => {
      state.dialog = {
        type: null,
        variant: null,
        isOpen: false,
        title: "",
        content: "",
        callback: null,
      };
    },
  },
});

export const {
  setShowBanner,
  confirmDialog,
  closeDialog,
} = commonSlice.actions;

export default commonSlice.reducer;