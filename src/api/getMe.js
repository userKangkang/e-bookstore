import axios from "axios";
import {PREFIX} from "./common";

export const getMe = async () => {
  const response = await axios.get(`${PREFIX}/user/me`);

  console.log(response.data);

  return response.data;
};
