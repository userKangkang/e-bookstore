import axios from "axios";
import {PREFIX} from "./common";

axios.defaults.withCredentials = true;

export const getLogin = async (username, password) => {
  const response = await axios.post(`${PREFIX}/login`, {
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
