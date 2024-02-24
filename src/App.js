import React from 'react';
import { ConfigProvider, Layout, Menu, theme } from 'antd';
import './App.css';
import Login from "./page/login.js";
import Shopping from "./page/shopping.js";
import BasicLayout from "./components/layout.js";
import { BrowserRouter as Router, Switch, Route, Routes, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <BasicLayout>
            <Outlet />
          </BasicLayout>
        }>
          <Route path="/login" element={<Login />} />
          <Route path="/shopping" element={<Shopping />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default App;