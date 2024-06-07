import { request } from "../utils/token";
import { LOCALURL } from "./common";

export const uploadImg = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const result = request.post(`${LOCALURL}/upload/avatar`, formData, {
        headers: {
        "Content-Type": "multipart/form-data"
        }
    });
    
    return result;
}