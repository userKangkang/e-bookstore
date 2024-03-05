import {useSelector, useDispatch} from "react-redux";
import {increment, decrement, add} from "../store/modules/counterStore";
import React from "react";
import {Space, Table, Tag, InputNumber, Button} from "antd";

function onChange(value) {
  console.log("changed", value);
}

const columns = [
  {
    title: "书名",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>
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
    render: () => (
      <Space size="middle">
        <a>2021-10-01</a>
      </Space>
    )
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    number: 1
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    number: 1
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    number: 1
  }
];
const Order = () => {
  const {count} = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div className="w-full p-[20px] self-start h-full">
      <Table columns={columns} dataSource={data} />
      {count}
      <button onClick={() => dispatch(increment())} className=" border-[1px]">
        +1
      </button>
      <button onClick={() => dispatch(add(20))} className=" border-[1px]">
        +20
      </button>
    </div>
  );
};
export default Order;
