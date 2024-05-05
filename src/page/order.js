import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, add} from "../store/modules/counterStore";
import React from "react";
import {Space, Table, Tag, InputNumber, Button, Image} from "antd";
import {staticBooks} from "../assets/staticdata";
import { useState, useEffect } from "react";
import { getOrders } from "../api/getUserRelated";




const columns = [

  {
    title: "订单号",
    key: "orderId",
    dataIndex: "key",
    render: (orderId) => <div>{orderId}</div>
  },
  {
    title: "总价",
    dataIndex: "money",
    key: "money"
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
  },

];

const Order = () => {
  const id = localStorage.getItem("id");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
     const getOrder = async () => {
        const response = await getOrders(Number(id));
        const orders = response.data.map((order) => {
          return {
            key: order.orderId,
            money: order.money,
            time: order.time,
            address: order.address,
            orderBooks: order.orderBooks
          }
        });
        setOrders(orders);
     }
     getOrder();
  }, [id]);


  return (
    <div className="w-[95%] p-[50px] self-start h-full">
      <Table columns={columns} dataSource={orders} 
      expandable={{
        expandedRowRender: (record) => {
          const columns = [
            {title: "书名", dataIndex: "name", key: "name"},
            {title: "数量", dataIndex: "count", key: "count"},
            {title: "单价", dataIndex: "singlePrice", key: "singlePrice"},
            {title: "总价", dataIndex: "price", key: "price"},
            {title: "封面", dataIndex: "path", key: "path", render: (path) => (
              <Image src={path} width="50px" height="50px"/>)}
          ];
          const data = record.orderBooks.map((orderbook) => {
            return {
              key: orderbook.book_id,
              name: orderbook.book.name,
              count: orderbook.number,
              price: orderbook.prices,
              path: orderbook.book.path,
              singlePrice: orderbook.book.price
            }
          });
          return <Table columns={columns} dataSource={data} pagination={false}/>
        },
      }}/>
    </div>
  );
};
export default Order;
