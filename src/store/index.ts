import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  }
});

export default store;
// 定义应用状态类型

export const getState: () => RootState = store.getState;

// 从 store 本身推断“RootState”和“AppDispatch”类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型 {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
