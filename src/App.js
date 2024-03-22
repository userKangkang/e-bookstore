import React from 'react';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import './App.css';
import Login from "./page/login.js";
import Cart from "./page/cart.js";
import Shopping from "./page/shopping.js";
import BookDetail from "./page/bookdetail.js";
import Order from "./page/order.js";
import BasicLayout from "./components/layout.js";
import {BrowserRouter as Router, Switch, Route, Routes, Outlet} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <BasicLayout>
              <Outlet />
            </BasicLayout>
          }
        >
          <Route path="login" element={<Login />} />
          <Route index element={<Shopping />} />
          <Route path="cart" element={<Cart />} />
          <Route path="bookdetail/:id" element={<BookDetail />} />
          <Route path="order" element={<Order />} />
          {/* SE3330 */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;