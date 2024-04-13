
import { request } from "../utils/request";

export const getBookDetail = async (bookId) => {
  return request({
    url: `/getbook/${bookId}`,
    method: "GET"
  });
};
