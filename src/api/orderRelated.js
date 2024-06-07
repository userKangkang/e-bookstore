import { request } from "../utils/token";
import {LOCALURL} from "./common";

export const addOrder = async (order) => {
    const response = await request.post(`${LOCALURL}/order/add`, order);
    
    
    
    return response.data;
};

export const getOrders = async () => {
    const response = await request.get(`${LOCALURL}/manager/order/all`);
    
    
    
    return response.data;
}

export const getOrdersByDate = async (date, page, size) => {
    const response = await request.get(`${LOCALURL}/user/orders/time/${date[0]}/${date[1]}/${page}/${size}`);
    
    return response.data;
}

export const getOrderNumberByDate = async (date) => {
    const response = await request.get(`${LOCALURL}/user/orders/number/${date[0]}/${date[1]}`);
    
    return response.data;
}

export const getAllOrdersByTime = async (date) => {
    const response = await request.get(`${LOCALURL}/manager/order/time/${date[0]}/${date[1]}`);
    
    
    
    return response.data;
}

export const getOrdersByName = async (name) => {
    const response = await request.get(`${LOCALURL}/manager/order/name/${name}`);
    
    return response.data;
}

export const getOrderNumberByName = async (name) => {
    const response = await request.get(`${LOCALURL}/user/orders/number/${name}`);
    
    return response.data;
}

export const getOrdersByNameAndUid = async (name, page, size) => {
    const response = await request.get(`${LOCALURL}/user/orders/name/${name}/${page}/${size}`);
    
    
    
    return response.data;
}