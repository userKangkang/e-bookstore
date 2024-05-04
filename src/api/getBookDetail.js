import axios from "axios";
import {LOCALURL} from "./common";

export const getBookDetail = async (bookId) => {
  const response = await axios.get( `${LOCALURL}/getbook/${bookId}`);

  console.log(response.data);

  return response.data;
};
