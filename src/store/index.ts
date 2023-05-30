import { configureStore } from "@reduxjs/toolkit";

//reducers
import JobOfferSlice from "./slices/JobOfferSlice";

export const store = configureStore({
  reducer: {
    JobOfferSlice,
  },
});
