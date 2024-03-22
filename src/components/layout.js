import React from 'react';
import {ConfigProvider, Layout, Menu, theme} from "antd";
import {Link, Outlet} from 'react-router-dom';
import User from './user';

const {Header, Content, Footer} = Layout;
const items = [
  {
    key: "shopping",
    label: <Link to="/book">商城</Link>
  },
  {
    key: "cart",
    label: <Link to="/cart">购物车</Link>
  },
  {
    key: "order",
    label: <Link to="/order">订单</Link>
  },
  {
    key: "signup",
    label: <Link to="/signup">注册</Link>
  },
  {
    key: "manager",
    label: <Link to="/manager">管理员专区</Link>
  }
];
export default function BasicLayout() {
  const {
    token: {colorBgContainer, borderRadius, colorPrimary}
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          borderRadius: 2,
          colorBgContainer: "#f6ffed"
        }
      }}
    >
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            display: "flex",
            alignItems: "center",
            zIndex: 1
          }}
        >
          <div className="demo-logo" />
          <div className="green">e-BookStore</div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["shopping"]}
            items={items}
            style={{
              background: colorBgContainer,
              flex: 1,
              minWidth: 0
            }}
          />
          <User />
        </Header>
        <Content
          style={{
            minHeight: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f6ffed"
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center"
          }}
        >
          e-Bookstore ©{new Date().getFullYear()} Created by userKangkang@github
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}
