import axios from "axios";
import {LOCALURL} from "./common";

export const addOrder = async (order) => {
    const response = await axios.post(`${LOCALURL}/order/add`, order);
    
    
    
    return response.data;
};

export const getOrders = async () => {
    const response = await axios.get(`${LOCALURL}/manager/order/all`);
    
    
    
    return response.data;
}

export const getOrdersByDate = async (id, date) => {
    const response = await axios.get(`${LOCALURL}/user/orders/time/${id}/${date[0]}/${date[1]}`);
    
    
    
    return response.data;
}

export const getAllOrdersByTime = async (date) => {
    const response = await axios.get(`${LOCALURL}/manager/order/time/${date[0]}/${date[1]}`);
    
    
    
    return response.data;
}

export const getOrdersByName = async (name) => {
    const response = await axios.get(`${LOCALURL}/manager/order/name/${name}`);
    
    
    
    return response.data;
}

export const getOrdersByNameAndUid = async (name, uid) => {
    const response = await axios.get(`${LOCALURL}/user/orders/name/${uid}/${name}`);
    
    
    
    return response.data;
}