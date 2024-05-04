import React from "react";
import {Space, Table, Input, InputNumber, Button, message} from "antd";
import {useState, useEffect} from "react";
import {getCarts, removeCart} from "../api/CartRelated";
import { addOrder } from "../api/orderRelated";

const {Search} = Input;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isRender, setIsRender] = useState(false);
  const id = localStorage.getItem("id");

  useEffect(() => {
    console.log(id);
    const getCart = async () => {
      const response = await getCarts(id);
      const carts = response.data.map((cart) => {
        return {
          key: cart.id,
          book_id: cart.book_id,
          path: cart.book.path,
          name: cart.book.name,
          prices: cart.prices,
          number: cart.number,
          time: cart.time,
          address: cart.address
        };
      });
      setCart(carts);
    };
    getCart();
  }, [isRender]);

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
      key: "name"
    },
    {
      title: "价格",
      dataIndex: "prices",
      key: "prices"
    },
    {
      title: "数量",
      key: "number",
      render: (data) => <InputNumber min={1} max={10} defaultValue={data.number} onChange={(value) => {}} />
    },
    {
      title: "收货地址",
      key: "address",
      dataIndex: "address",
      render: (address) => <div>{address}</div>
    },
    {
      title: "操作",
      key: "action",
      render: (data) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                const order = {
                  ...data,
                  uid: localStorage.getItem("id"),
                };
                console.log(order);
                addOrder(order).then((res) => {
                  if (res.code) {
                    message.success("购买成功");
                    setIsRender(!isRender);
                  } else {
                    message.error("购买失败");
                  }
                })
                removeCart(data.key);
              }}
            >
              购买
            </a>
            <a
            onClick={()=>{
              removeCart(data.key).then((res)=>{
                if(res.code){
                  message.success("删除成功")
                  setIsRender(!isRender)
                }else{
                  message.error("删除失败")
                }
              }).catch((e)=>{
                message.error("网络错误")})
            }}
            >删除</a>
          </Space>
        );
      }
    }
  ];
  return (
    <div className="w-[95%] p-[20px] self-start h-full">
      <Search placeholder="input search text" allowClear enterButton="Search" size="large" className=" w-[95%] mb-[20px] bg-green-400" />
      <Table columns={columns} dataSource={cart} />
      <Button className="mt-4 bg-green-500 text-white rounded-lg">全部购买</Button>
    </div>
  );
};
export default Cart;
