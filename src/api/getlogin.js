import axios from "axios";
import {PREFIX} from "./common";
import {LOCALURL} from "./common";

export const getLogin = async (username, password) => {
  const response = await axios.post(`${LOCALURL}/user/login`, {
    username: username,
    password: password
  });


  return response.data;
};

export const Logout = async () => {
  const response = await axios.put(`${PREFIX}/logout`);


  return response.data;
};
