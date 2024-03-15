import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface YearState {
    minYear: number;
    maxYear: number;
}

const initialState: YearState = {
    minYear: 1980,
    maxYear: new Date().getFullYear()
}

export const yearSlice = createSlice({
    name: "year",
    initialState,
    reducers: {
        setMinYear: (state, action: PayloadAction<number>) => {
            state.minYear = action.payload;
        },
        setMaxYear: (state, action: PayloadAction<number>) => {
            state.maxYear = action.payload;
        }
    }
});

export const { setMinYear, setMaxYear } = yearSlice.actions;

export const selectMinYear = (state: RootState) => state.year.minYear;

export default yearSlice.reducer;