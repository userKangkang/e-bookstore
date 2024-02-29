import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import {Link} from 'react-router-dom';

const items = [
  {
    label: 'userKangkang',
    key: 'username',
    icon: <UserOutlined />
  },
  {
    label: `账户余额：${1000}`,
    key: 'balance',
    icon: (
      <Tooltip title="账户余额">
        <span>￥</span>
      </Tooltip>
    )
  },
  {
    label: <Link to="/login">退出登录</Link>,
    key: 'logout',
    danger: true,
    icon: <DownOutlined />
  }
];

const User = () => {
    return(
        <Space wrap>
            <Dropdown menu={{items}}>
                <Button>
                    <UserOutlined/>
                </Button>
            </Dropdown>
        </Space>
        
    );
}

export default User;