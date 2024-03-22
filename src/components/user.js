import React from 'react';
import {DownOutlined, UserOutlined, LogoutOutlined} from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import {Link} from 'react-router-dom';
import ModifyPassword from "./modifypassword";
import {useSelector, useDispatch} from "react-redux";
import {setLogout} from "../store/modules/loginStore";
import {Logout} from "../api/getlogin";

const User = () => {
  const user = useSelector((state) => state.login.username);
  const balance = useSelector((state) => state.login.balance);
  const dispatch = useDispatch();

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
            dispatch(setLogout());
            message.success("退出登录成功");
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
        <Button>
          <UserOutlined />
        </Button>
      </Dropdown>
    </Space>
  );
};

export default User;