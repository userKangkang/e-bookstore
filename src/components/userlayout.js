import React from "react";

import {BookOutlined, HomeOutlined} from "@ant-design/icons";

import {Menu} from "antd";
import {Link, Outlet, useSearchParams} from "react-router-dom";

import {useState} from "react";

const items = [
  {
    label: <Link to="/user">个人信息</Link>,
    key: "/",
    icon: <HomeOutlined />
  },
  {
    label: <Link to="/user/stat">消费统计</Link>,
    key: "shopping",
    icon: <BookOutlined />
  }
];
const UserLayout = () => {
  // 编程导航

  const [current, setCurrent] = useState("/user");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <div className="min-h-[500px] w-11/12 flex">
      <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} className=" pr-[10px]" />
      <Outlet />
    </div>
  );
};

export default UserLayout;