import axios from "axios";
import {PREFIX} from "./common";
import { LOCALURL } from "./common";

export const modifyPwd = async (password) => {
  const response = await axios.put(`${PREFIX}/user/me/password`, {
    password: password
  });

  console.log(response.data);

  return response.data;
};

export const modifyProfile = async (id, username, hobby, avatar, signature) => {
  const response = await axios.put(`${LOCALURL}/user/profile`, {
    id: id,
    username: username,
    hobby: hobby,
    avatar: avatar,
    signature: signature
  });

  console.log(response.data);

  return response.data;
}