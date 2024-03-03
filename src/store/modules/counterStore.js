import {createSlice} from "@reduxjs/toolkit";

const counterStore = createSlice({
  name: "counter",
  // 初始化状态
  initialState: {
    count: 0
  },
  // 修改数据的方法
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    }
  }
});

// 解构actionCreator函数
const {increment, decrement} = counterStore.actions;
// 获取reducer函数

// 导出actionCreator函数和reducer函数
export {increment, decrement};

export default counterStore.reducer;
