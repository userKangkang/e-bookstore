import React from "react";

import {BookOutlined, HomeOutlined} from "@ant-design/icons";

import {Menu} from "antd";
import {Link, Outlet, useSearchParams} from "react-router-dom";

import {useState} from "react";

const items = [
  {
    label: <Link to="/book">首页</Link>,
    key: "/",
    icon: <HomeOutlined />
  },
  {
    label: <Link to="/book/shopping">书库</Link>,
    key: "shopping",
    icon: <BookOutlined />
  }
];
const BookLayout = () => {
  // 编程导航
  const [params] = useSearchParams();
  const bookname = params.get("book");
  const [current, setCurrent] = useState(bookname === null ? "/" : bookname);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key === "shopping" ? "shopping" : "/");
  };
  return (
    <div className=" w-11/12 flex">
      <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} className=" pr-[10px]" />
      <Outlet />
    </div>
  );
};

export default BookLayout;
