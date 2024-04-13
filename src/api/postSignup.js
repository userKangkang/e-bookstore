import axios from "axios";
import { LOCALURL } from "./common";

export const postSignup = async (username, password, email) => {
    const response = await axios.post(`${LOCALURL}/user/signup`, {
        username: username,
        password: password,
        email: email
    });

    console.log(response.data);
};

