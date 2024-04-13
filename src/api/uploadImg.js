import axios from "axios";
import { LOCALURL } from "./common";

export const uploadImg = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const result = axios.post(`${LOCALURL}/upload/avatar`, formData, {
        headers: {
        "Content-Type": "multipart/form-data"
        }
    });
    console.log(result);
    return result;
}