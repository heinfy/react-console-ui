import type { UserInfo } from '@/types/self';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export interface UserState {
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  userInfo: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 保存用户信息
    saveUserInfoByAmount: (
      state,
      action: PayloadAction<UserState['userInfo']>
    ) => {
      state.userInfo = action.payload;
    }
  }
});

// 导出 actions
export const { saveUserInfoByAmount } = userSlice.actions;

// 导出 选择器
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
