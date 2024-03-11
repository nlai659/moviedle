import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface DailyState {
  daily: boolean;
}

const initialState: DailyState = {
  daily: true,
};

export const dailySlice = createSlice({
  name: "daily",
  initialState,
  reducers: {
    setDaily: (state, action: PayloadAction<boolean>) => {
      state.daily = action.payload;
    },
  },
});

export const { setDaily } = dailySlice.actions;

export const selectDaily = (state: RootState) => state.daily.daily;

export default dailySlice.reducer;