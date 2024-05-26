import { configureStore } from "@reduxjs/toolkit";
import navigationSlice from "./slices/navigation";
import matrixSlice from "./slices/matrix";

export default configureStore({
  reducer: {
    matrix: matrixSlice,
    navigation: navigationSlice,
  },
});
