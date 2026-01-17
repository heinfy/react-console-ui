import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from '../index';
import { fetchCount } from './counterAPI';

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle'
};

// 下面的函数称为 thunk，它允许我们执行异步逻辑。 它
// 可以像常规操作一样进行调度：“dispatch(incrementAsync(10))”。 这
// 将使用“dispatch”函数作为第一个参数来调用 thunk。 异步
// 然后可以执行代码并分派其他操作。 谢谢
// 通常用于发出异步请求。
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // 我们返回的值成为“fulfilled”操作有效负载
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit 允许我们在减速器中编写“变异”逻辑。 它
      // 实际上并没有改变状态，因为它使用了 Immer 库，
      // 检测“草稿状态”的变化并生成一个全新的
      // 基于这些变化的不可变状态
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  },
  // `extraReducers` 字段让切片处理其他地方定义的操作，
  // 包括由 createAsyncThunk 或其他切片生成的操作。
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, state => {
        state.status = 'failed';
      });
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 下面的函数称为选择器，允许我们从中选择一个值
// 国家。 选择器也可以在使用它们的地方内联定义，而不是
// 在切片文件中。 例如：`useSelector((state) => state.counter.value)`
// 其他代码（例如选择器）可以使用导入的“RootState”类型
export const selectCount = (state: RootState) => state.counter.value;

// 我们也可以手工编写thunk，它可能同时包含同步和异步逻辑。
// 这是一个根据当前状态有条件地调度操作的示例。
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default counterSlice.reducer;
