import React from "react";

import {UserOutlined, BookOutlined, MoneyCollectOutlined} from "@ant-design/icons";

import {Menu} from "antd";
import {Link, Outlet, useSearchParams} from "react-router-dom";

import {useState} from "react";
import User from "./user";

const items = [
  {
    label: <Link to="/manager">用户</Link>,
    key: "user",
    icon: <UserOutlined />
  },
  {
    label: <Link to="/manager/books">书籍</Link>,
    key: "books",
    icon: <BookOutlined />
  },
  {
    label: <Link to="/manager/orders">订单</Link>,
    key: "orders",
    icon: <MoneyCollectOutlined />
  
  }
];
const ManagerLayout = () => {
  // 编程导航
  const [current, setCurrent] = useState("/manager");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className=" w-11/12 flex self-start">
      <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} className=" pr-[10px]" />
      <Outlet />
    </div>
  );
};

export default ManagerLayout;
