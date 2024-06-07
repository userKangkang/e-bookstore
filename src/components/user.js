import React from 'react';
import {DownOutlined, UserOutlined, LogoutOutlined} from "@ant-design/icons";
import { Avatar, Dropdown, message, Space, Tooltip } from 'antd';
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import {UserContext} from "../App";
import {useContext} from "react";
import { Logout } from '../api/UserRelated';

const User = () => {
  const [user, setUser] = useState(sessionStorage.getItem("username"));
  const [balance, setBalance] = useState(sessionStorage.getItem("balance"));
  const [avatar, setAvatar] = useState(sessionStorage.getItem("avatar"));

  const {userChange, setUserChange} = useContext(UserContext);

  useEffect(() => {
    setUser(sessionStorage.getItem("username"));
    setBalance(sessionStorage.getItem("balance"));
    setAvatar(sessionStorage.getItem("avatar"));
  },[userChange]);

  const items = [
    {
      label: user || "未登录",
      key: "username",
      icon: <UserOutlined />
    },
    {
      label: `账户余额：${balance / 100}`,
      key: "balance",
      icon: (
        <Tooltip title="账户余额">
          <span>￥</span>
        </Tooltip>
      )
    },
    {
      label: (
        <Link
          to="/"
          onClick={() => {
            message.success("退出登录成功");
            sessionStorage.clear();
            setUserChange(!userChange);
            Logout();
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