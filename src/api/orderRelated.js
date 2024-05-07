import axios from "axios";
import {LOCALURL} from "./common";

export const addOrder = async (order) => {
    const response = await axios.post(`${LOCALURL}/order/add`, order);
    
    console.log(response.data);
    
    return response.data;
};

export const getOrders = async () => {
    const response = await axios.get(`${LOCALURL}/manager/order/all`);
    
    console.log(response.data);
    
    return response.data;
}