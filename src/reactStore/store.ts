import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import airtableSlice from "../airtable/airtableSlice";
export const store = configureStore({
  reducer: {
    records: airtableSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
