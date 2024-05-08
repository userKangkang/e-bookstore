import {createSlice} from "@reduxjs/toolkit";
import { set } from "lodash";

const loginStore = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
    islogin: false,
    balance: 0,
    avatar: "",
    id: null,
    hobby: "",
    signature: ""
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
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setHobby(state, action) {
      state.hobby = action.payload;
    },
    setSignature(state, action) {
      state.signature = action.payload;
    },
    setLogout: (state) => {
      state.islogin = false;
      state.username = "";
      state.password = "";
      state.balance = null;
      state.avatar = "";
      state.id = null;
    }
  }
});

const {setUsername, setPassword, setIslogin, setLogout, setBalance, setAvatar, setId, setHobby, setSignature} = loginStore.actions;

export {setUsername, setPassword, setIslogin, setLogout, setBalance, setAvatar, setId, setHobby, setSignature};

export default loginStore.reducer;
