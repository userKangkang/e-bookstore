import axios from "axios";
import {LOCALURL} from "./common";

export const addOrder = async (order) => {
    const response = await axios.post(`${LOCALURL}/order/add`, order);
    
    console.log(response.data);
    
    return response.data;
};