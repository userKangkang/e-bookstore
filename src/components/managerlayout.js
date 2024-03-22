import React from "react";

import {UserOutlined, BookOutlined} from "@ant-design/icons";

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
  }
];
const ManagerLayout = () => {
  // 编程导航
  const [current, setCurrent] = useState("/manager");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key === "user" ? "user" : "books");
  };
  return (
    <div className=" w-11/12 flex self-start">
      <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} className=" pr-[10px]" />
      <Outlet />
    </div>
  );
};

export default ManagerLayout;
