import {createSlice} from "@reduxjs/toolkit";

const loginStore = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
    islogin: false,
    balance: null
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIslogin: (state, action) => {
      state.islogin = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setLogout: (state) => {
      state.islogin = false;
      state.username = "";
      state.password = "";
      state.balance = null;
    }
  }
});

const {setUsername, setPassword, setIslogin, setLogout, setBalance} = loginStore.actions;

export {setUsername, setPassword, setIslogin, setLogout, setBalance};

export default loginStore.reducer;
