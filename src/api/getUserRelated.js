import axios from "axios";
import { LOCALURL } from "./common";

export const getMe = async (username) => {
  const response = await axios.post(`${LOCALURL}/user/getme`,{username:username});

  console.log(response.data);

  return response.data;
};

export const getOrders = async (userId) => {
  const response = await axios.get(`${LOCALURL}/user/orders/${userId}`);

  console.log(response.data);

  return response.data;
}
