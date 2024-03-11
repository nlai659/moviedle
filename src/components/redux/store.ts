import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import dailyReducer from './dailySlice'

const store = configureStore({
  reducer: {
    category: categoryReducer,
    daily: dailyReducer,
  },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch