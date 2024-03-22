import axios from "axios";
import {PREFIX} from "./common";

export const modifyPwd = async (password) => {
  const response = await axios.put(`${PREFIX}/user/me/password`, {
    password: password
  });

  console.log(response.data);

  return response.data;
};
