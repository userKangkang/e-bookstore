import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const setToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const request = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

request.interceptors.request.use(
  function (config) {
    const session = getToken();
    if(session) {
      config.headers.session = `${session}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export {getToken, setToken, removeToken, request};
