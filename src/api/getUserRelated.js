import axios from "axios";
import { LOCALURL } from "./common";

export const getMe = async (username) => {
  const response = await axios.post(`${LOCALURL}/user/getme`,{username:username});

  return response.data;
};

export const getOrders = async (userId) => {
  const response = await axios.get(`${LOCALURL}/user/orders/${userId}`);


  return response.data;
}

export const getUserStat = async (userId, date) => {
  const response = await axios.get(`${LOCALURL}/user/stat/${userId}/${date[0]}/${date[1]}`);


  return response.data;
}
