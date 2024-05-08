import axios from "axios";
import { LOCALURL } from "./common";

export const postSignup = async (user) => {
    const response = await axios.post(`${LOCALURL}/user/signup`, user);

    return response.data;
};

