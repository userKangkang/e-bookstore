import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, add} from "../store/modules/counterStore";
import React from "react";
import {Space, Table, Tag, InputNumber, Button} from "antd";
import {staticBooks} from "../assets/staticdata";
import { useState, useEffect } from "react";
import { getOrders } from "../api/getUserRelated";
import { get, times } from "lodash";


function onChange(value) {
  console.log("changed", value);
}

const columns = [
  {
    title: "图片",
    dataIndex: "path",
    key: "path",
    render: (path) => <img src={path} className="w-20" />
  },
  {
    title: "书名",
    dataIndex: "name",
    key: "name",
    render: (text) => <div>{text}</div>
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price"
  },
  {
    title: "数量",
    key: "number",
    dataIndex: "number",
    render: (number) => <div>{number}</div>
  },
  {
    title: "购买时间",
    key: "time",
    dataIndex: "time",
    render: (time) => (
      <Space size="middle">
        <div>{time}</div>
      </Space>
    )
  },
  {
    title: "收货地址",
    key: "address",
    dataIndex: "address",
    render: (address) => <div>{address}</div>
  }
];

const Order = () => {
  const id = localStorage.getItem("id");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
     const getOrder = async () => {
        const response = await getOrders(Number(id));
        const orders = response.data.map((order) => {
          return {
            key: order.id,
            path: order.book.path,
            name: order.book.name,
            price: order.prices,
            number: order.number,
            time: order.time,
            address: order.address
          }
        });
        setOrders(orders);
     }
     getOrder();
  }, [id]);


  return (
    <div className="w-[95%] p-[50px] self-start h-full">
      <Table columns={columns} dataSource={orders} />
    </div>
  );
};
export default Order;
