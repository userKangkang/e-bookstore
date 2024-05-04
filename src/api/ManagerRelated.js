import axios from "axios";
import {LOCALURL} from "./common";

export const getBookList = async () => {
    const response = await axios.get(`${LOCALURL}/manager/book/get`);
    
    console.log(response.data);    

    return response.data;
}

export const addBook = async (book) => {
    const response = await axios.post(`${LOCALURL}/manager/book/add`, book);
    
    console.log(response.data);    

    return response.data;
}

export const updateBook = async (book) => {
    const response = await axios.put(`${LOCALURL}/manager/book/update`, book);
    
    console.log(response.data);    

    return response.data;
}

export const getUserList = async () => {
    const response = await axios.get(`${LOCALURL}/manager/user/get`);
    
    console.log(response.data);    

    return response.data;
}