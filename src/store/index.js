import {configureStore} from "@reduxjs/toolkit";
import counterReducer from "./modules/counterStore";
import cartReducer from "./modules/cartStore";
import loginReducer from "./modules/loginStore";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    login: loginReducer
  }
});

export default store;
