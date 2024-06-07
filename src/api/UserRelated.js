import { request } from "../utils/token";
import {PREFIX} from "./common";
import {LOCALURL} from "./common";

export const getLogin = async (username, password) => {
  const response = await request.post(`${LOCALURL}/user/login`, {
    username: username,
    password: password
  });

  return response.data;
};

export const Logout = async () => {
  const response = await request.get(`${LOCALURL}/user/logout`);

  return response.data;
};

export const getMe = async () => {
  const response = await request.post(`${LOCALURL}/user/getme`,);

  return response.data;
};

export const getOrders = async (page, size) => {
  const response = await request.get(`${LOCALURL}/user/orders/${page}/${size}`);

  return response.data;
}

export const getOrderNumberByUid = async () => {
  const response = await request.get(`${LOCALURL}/user/orders/number`);

  return response.data;
}

export const getUserStat = async (userId, date) => {
  const response = await request.get(`${LOCALURL}/user/stat/${date[0]}/${date[1]}`);


  return response.data;
}

export const postSignup = async (user) => {
    const response = await request.post(`${LOCALURL}/user/signup`, user);

    return response.data;
};

export const modifyPwd = async (password) => {
    const response = await request.put(`${PREFIX}/user/me/password`, {
      password: password
    });
  
    
  
    return response.data;
  };
  
  export const modifyProfile = async (id, username, hobby, avatar, signature) => {
    const response = await request.put(`${LOCALURL}/user/profile`, {
      id: id,
      username: username,
      hobby: hobby,
      avatar: avatar,
      signature: signature
    });
  
    
  
    return response.data;
  }