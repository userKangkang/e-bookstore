import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, add} from "../store/modules/counterStore";
import React from "react";
import {Space, Table, Tag, InputNumber, Button} from "antd";
import staticBooks from "../assets/staticdata";
function onChange(value) {
  console.log("changed", value);
}

const columns = [
  {
    title: "图片",
    dataIndex: "path",
    key: "path",
    render: (path) => <img src={process.env.PUBLIC_URL + `/img/${path}`} className="w-20" />
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
    render: (number) => <div>{1}</div>
  },
  {
    title: "购买时间",
    key: "time",
    render: () => (
      <Space size="middle">
        <div>2021-10-01</div>
      </Space>
    )
  }
];

const Order = () => {
  return (
    <div className="w-[95%] p-[50px] self-start h-full">
      <Table columns={columns} dataSource={staticBooks} />
    </div>
  );
};
export default Order;
