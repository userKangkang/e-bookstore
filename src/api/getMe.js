import axios from "axios";
import { LOCALURL } from "./common";

export const getMe = async (username) => {
  const response = await axios.post(`${LOCALURL}/user/getme`,{username:username});

  console.log(response.data);

  return response.data;
};
