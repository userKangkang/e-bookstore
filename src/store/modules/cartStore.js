import {createSlice} from "@reduxjs/toolkit";

const cartStore = createSlice({
  name: "cart",
  initialState: {
    cartList: []
  },
  reducers: {
    addCart: (state, action) => {
      if (!state.cartList.find((item) => item.id === action.payload.id)) {
        state.cartList.push(action.payload);
      }
    },
    removeCart: (state, action) => {
      state.cartList = state.cartList.filter((item) => item.id !== action.payload);
    },
    setAmount: (state, action) => {
      const item = state.cartList.find((item) => item.id === action.payload.id);
      const index = state.cartList.findIndex((item) => item.id === action.payload.id);
      state.cartList[index] = {...item, number: action.payload.number};
    }
  }
});

const {addCart, removeCart, setAmount} = cartStore.actions;

export {addCart, removeCart, setAmount};

export default cartStore.reducer;
