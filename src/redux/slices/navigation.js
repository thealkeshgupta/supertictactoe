import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNextPage: (state, action) => {
      state.page = state.page + 1;
    },

    setPreviousPage: (state, action) => {
      state.page = state.page - 1;
    },
  },
});

export default navigationSlice.reducer;
export const { setNextPage, setPreviousPage } = navigationSlice.actions;
