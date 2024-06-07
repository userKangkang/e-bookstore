import { request } from "../utils/token";
import {LOCALURL} from "./common";

export const getBookDetail = async (bookId) => {
  const response = await request.get( `${LOCALURL}/getbook/${bookId}`);


  return response.data;
};

export const getSearchedBookList = async (search) => {
  const response = await request.get(`${LOCALURL}/manager/book/search/${search}`);


  return response.data;
}

export const getBooksByPagination = async (page, size) => {
  const response = await request.get(`${LOCALURL}/book/all/pagination/${page}/${size}`);

  return response.data;
}

export const getBookNumber = async () => {
  const response = await request.get(`${LOCALURL}/book/all/sum`);

  return response.data;
}