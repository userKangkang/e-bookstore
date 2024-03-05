import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./modules/counterStore";
import cartReducer from "./modules/cartStore";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer
  }
});

export default store;
