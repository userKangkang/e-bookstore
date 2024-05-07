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
import {Provider} from "react-redux";
import ManagerLayout from "../components/managerlayout";
import store from "../store";
import ManagerOrder from "../page/manager/managerorder";
import ManageCount from "../page/manager/managecount";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <BasicLayout />
      </Provider>
    ),
    children: [
      {index: true, element: <Login />},
      {
        path: "book",
        element: <BookLayout />,
        children: [
          {index: true, element: <Home />},
          {path: "shopping", element: <Shopping />}
        ]
      },
      {path: "cart", element: <Cart />},
      {path: "bookdetail/:id", element: <BookDetail />},
      {path: "order", element: <Order />},
      {path: "signup", element: <Signup />},
      {
        path: "manager",
        element: <ManagerLayout />,
        children: [
          {index: true, element: <ManageUser />},
          {path: "books", element: <ManageBook />},
          {path: "orders", element: <ManagerOrder />},
          {path: "count", element: <ManageCount/>},
        ]
      },
      {path: "profile", element: <Profile />}
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
