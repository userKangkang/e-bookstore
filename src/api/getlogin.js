import axios from "axios";
import {PREFIX} from "./common";
import {LOCALURL} from "./common";

export const getLogin = async (username, password) => {
  const response = await axios.post(`${LOCALURL}/user/login`, {
    username: username,
    password: password
  });

  console.log(response.data);

  return response.data;
};

export const Logout = async () => {
  const response = await axios.put(`${PREFIX}/logout`);

  console.log(response.data);

  return response.data;
};
