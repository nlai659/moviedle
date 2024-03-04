import Categories from "../../util/categoryMapping";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface CategoryState {
  category: number;
}

const initialState: CategoryState = {
  category: Categories.MOVIE,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category.category;

export default categorySlice.reducer;