import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setAmount} from "../store/modules/cartStore";
import {removeCart} from "../store/modules/cartStore";
import {Space, Table, Tag, InputNumber, Button} from "antd";

const Cart = () => {
  const cartList = useSelector((state) => state.cart.cartList);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "图片",
      dataIndex: "img",
      key: "img",
      render: (img) => <img src={process.env.PUBLIC_URL + `/img/${img}`} className="w-20" />
    },
    {
      title: "书名",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "数量",
      key: "number",
      render: (data) => (
        <InputNumber
          min={1}
          max={10}
          defaultValue={data.number}
          onChange={(value) => {
            console.log(data);
            dispatch(setAmount({id: data.id, number: value}));
          }}
        />
      )
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "id",
      render: (id) => {
        return (
          <Space size="middle">
            <a>购买</a>
            <a
              onClick={() => {
                dispatch(removeCart(id));
              }}
            >
              删除
            </a>
          </Space>
        );
      }
    }
  ];
  return (
    <div className="w-[95%] p-[20px] self-start h-full">
      <Table columns={columns} dataSource={cartList} />
      <Button className="mt-4 bg-green-500 text-white rounded-lg">全部购买</Button>
    </div>
  );
};
export default Cart;
