import React, {useState, useEffect, useContext} from 'react';
import {ConfigProvider, Layout, Menu, theme} from "antd";
import {Link, Outlet} from 'react-router-dom';
import {UserContext} from "../App";
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
    key: "profile",
    label: <Link to="/user">个人中心</Link>
  }
];
export default function BasicLayout() {

  const {userChange, setUserChange} = useContext(UserContext);

  const [loginedItems, setLoginedItems] = useState(items);

  useEffect(() => {
    setLoginedItems((localStorage.getItem("identity") === "1") ? [
      ...items, {
        key: "manager",
        label: <Link to="/manager">管理员专区</Link>
      },
    ] : items);
  }, [userChange]);

  
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
            items={loginedItems}
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
