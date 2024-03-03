import BasicLayout from "../components/layout";
import Login from "../page/login";
import Cart from "../page/cart";
import EditProfile from "../components/editprofile";
import Shopping from "../page/shopping";
import BookDetail from "../page/bookdetail";
import Reservation from "../components/reservation";
import Order from "../page/order";
import NotFound from "../page/notfound";
import {createBrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <BasicLayout />
      </Provider>
    ),
    children: [
      {path: "login", element: <Login />},
      {index: true, element: <Shopping />},
      {path: "cart", element: <Cart />},
      {path: "bookdetail/:id", element: <BookDetail />},
      {path: "order", element: <Order />},
      {path: "editprofile", element: <EditProfile />},
      {path: "reservation", element: <Reservation />}
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
