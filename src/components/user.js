import React from 'react';
import {DownOutlined, UserOutlined, LogoutOutlined} from "@ant-design/icons";
import { Avatar, Dropdown, message, Space, Tooltip } from 'antd';
import {Link} from 'react-router-dom';
import ModifyPassword from "./modifypassword";
import {useState, useEffect} from "react";
import {UserContext} from "../App";
import {useContext} from "react";

const User = () => {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [balance, setBalance] = useState(localStorage.getItem("balance"));
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));

  const {userChange, setUserChange} = useContext(UserContext);

  useEffect(() => {
    setUser(localStorage.getItem("username"));
    setBalance(localStorage.getItem("balance"));
    setAvatar(localStorage.getItem("avatar"));
  },[userChange]);

  const items = [
    {
      label: user || "未登录",
      key: "username",
      icon: <UserOutlined />
    },
    {
      label: `账户余额：${balance}`,
      key: "balance",
      icon: (
        <Tooltip title="账户余额">
          <span>￥</span>
        </Tooltip>
      )
    },
    {
      label: <ModifyPassword />,

      key: "modifyPassword",
      danger: false,
      icon: <DownOutlined />
    },
    {
      label: (
        <Link
          to="/"
          onClick={() => {
            message.success("退出登录成功");
            localStorage.clear();
            setUserChange(!userChange);
          }}
        >
          退出登录
        </Link>
      ),

      key: "logout",
      danger: true,
      icon: <LogoutOutlined />
    }
  ];

  return (
    <Space wrap>
      <Dropdown menu={{items}}>
      <Avatar size={44} src={avatar} style={{
        border: "1px solid #606060",
      }} />
      </Dropdown>
    </Space>
  );
};

export default User;