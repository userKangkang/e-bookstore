import {getToken} from "../utils/token";
import {Navigate} from "react-router-dom";
import { message } from "antd";

const AuthRoute = ({children}) => {
  if (!getToken()) {
    message.error("请先登录");
    return <Navigate to="/" />;
  }
  return children;
};
export default AuthRoute;
