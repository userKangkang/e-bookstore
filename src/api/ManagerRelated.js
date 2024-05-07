import axios from "axios";
import {LOCALURL} from "./common";

export const getBookList = async () => {
    const response = await axios.get(`${LOCALURL}/manager/book/get`);
    
    console.log(response.data);    

    return response.data;
}

export const getSearchBookList = async (search) => {
    const response = await axios.get(`${LOCALURL}/manager/book/search/${search}`);
    
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

export const disableUser = async (id) => {
    const response = await axios.put(`${LOCALURL}/manager/user/disable/${id}`);
    
    console.log(response.data);    

    return response.data;
}

export const enableUser = async (id) => {
    const response = await axios.put(`${LOCALURL}/manager/user/enable/${id}`);
    
    console.log(response.data);    

    return response.data;
}

export const deleteBook = async (id) => {
    const response = await axios.delete(`${LOCALURL}/manager/book/delete/${id}`);
    
    console.log(response.data);    

    return response.data;
}

export const getBookRank = async (data) => {
    const response = await axios.get(`${LOCALURL}/manager/rank/book/${data[0]}/${data[1]}`);
    
    console.log(response.data);    

    return response.data;
}