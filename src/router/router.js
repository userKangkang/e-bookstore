import BasicLayout from "../components/layout";
import Login from "../page/login";
import Cart from "../page/cart";
import Shopping from "../page/bookRelated/shopping";
import BookDetail from "../page/bookRelated/bookdetail";
import Order from "../page/order";
import BookLayout from "../components/booklayout";
import NotFound from "../page/notfound";
import Home from "../page/bookRelated/home";
import ManageUser from "../page/manager/manageuser";
import ManageBook from "../page/manager/managebook";
import Signup from "../page/signup";
import Profile from "../page/profile";
import {createBrowserRouter} from "react-router-dom";
import ManagerLayout from "../components/managerlayout";
import ManagerOrder from "../page/manager/managerorder";
import ManageCount from "../page/manager/managecount";
import ManageConsume from "../page/manager/manageconsume";
import UserLayout from "../components/userlayout";
import UserStat from "../page/userStat";
import AuthRoute from "../components/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BasicLayout />
    ),
    children: [
      {index: true, element: <Login />},
      {
        path: "book",
        element: <AuthRoute><BookLayout /></AuthRoute>,
        children: [
          {index: true, element: <Home />},
          {path: "shopping", element: <Shopping />}
        ]
      },
      {path: "cart", element: <AuthRoute><Cart /></AuthRoute>},
      {path: "bookdetail/:id", element: <AuthRoute><BookDetail /></AuthRoute>},
      {path: "order", element: <AuthRoute><Order /></AuthRoute>},
      {path: "signup", element: <Signup />},
      {
        path: "manager",
        element: <AuthRoute><ManagerLayout /></AuthRoute>,
        children: [
          {index: true, element: <ManageUser />},
          {path: "books", element: <ManageBook />},
          {path: "orders", element: <ManagerOrder />},
          {path: "count", element: <ManageCount/>},
          {path: "consume", element: <ManageConsume />}
        ]
      },
      {
        path: "user",
        element: <AuthRoute><UserLayout /></AuthRoute>,
        children: [
          {index: true, element: <Profile />},
          {path: "stat", element: <UserStat />}
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
