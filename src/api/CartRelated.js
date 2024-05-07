import axios from "axios";
import { LOCALURL } from "./common";

export const getCarts = async (userId) => {
    const response = await axios.get(`${LOCALURL}/user/cart/${userId}`);
    
    console.log(response.data);
    
    return response.data;
}

export const addCart = async (uid, cart) => {
    const response = await axios.post(`${LOCALURL}/cart/add/${uid}`, cart);
    
    console.log(response.data);
    
    return response.data;
}

export const removeCart = async (cartId) => {
    const response = await axios.delete(`${LOCALURL}/cart/remove/${cartId}`);
    
    console.log(response.data);
    
    return response.data;
}

export const removeAllCart = async (userId) => {
    const response = await axios.delete(`${LOCALURL}/cart/remove/all/${userId}`);
    
    console.log(response.data);
    
    return response.data;
}

export const updateSingleCartNumber = async (cartId, number) => {
    const response = await axios.put(`${LOCALURL}/cart/update/single/number`, {
        id: cartId,
        number: number
    });
    
    console.log(response.data);
    
    return response.data;
}

export const updateAllCartNumber = async (data) => {
    const response = await axios.put(`${LOCALURL}/cart/update/all/number`, data);
    
    console.log(response.data);
    
    return response.data;
}