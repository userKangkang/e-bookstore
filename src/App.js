import React from 'react';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import './App.css';
import Login from "./page/login.js";
import Cart from './page/cart.js';
import EditProfile from './components/editprofile.js';
import Shopping from './page/shopping.js';
import BookDetail from './page/bookdetail.js';
import BasicLayout from './components/layout.js';
import Reservation from './components/reservation.js';
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
          <Route path="shopping" element={<Shopping />} />
          <Route path="cart" element={<Cart />} />
          <Route path="bookdetail/:id" element={<BookDetail />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="reservation" element={<Reservation />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;