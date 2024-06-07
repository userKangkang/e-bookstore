import { request } from "../utils/token";
import { LOCALURL } from "./common";

export const getCarts = async (userId) => {
    const response = await request.get(`${LOCALURL}/user/cart`);
    
    
    return response.data;
}

export const addCart = async (uid, cart) => {
    const response = await request.post(`${LOCALURL}/cart/add`, cart);
    
    
    return response.data;
}

export const removeCart = async (cartId) => {
    const response = await request.delete(`${LOCALURL}/cart/remove/${cartId}`);
    
    
    return response.data;
}

export const removeAllCart = async (userId) => {
    const response = await request.delete(`${LOCALURL}/cart/remove/all`);
    
    
    return response.data;
}

export const updateSingleCartNumber = async (cartId, number) => {
    const response = await request.put(`${LOCALURL}/cart/update/single/number`, {
        id: cartId,
        number: number
    });
    
    
    return response.data;
}

export const updateAllCartNumber = async (data) => {
    const response = await request.put(`${LOCALURL}/cart/update/all/number`, data);
    
    
    return response.data;
}

export const buyBooksByCart = async (data) => {
    const response = await request.post(`${LOCALURL}/cart/buy/all`, data);
    
    
    return response.data;
}