import React from "react";
import {Space, Table, Input, InputNumber, Button, message} from "antd";
import {useState, useEffect} from "react";
import {getCarts, removeCart, removeAllCart} from "../api/CartRelated";
import CartBuyModal from "../components/modals/cartBuyModal";
import { set } from "lodash";


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
      title: "操作",
      key: "action",
      render: (data) => {
        return (
          <Space size="middle">
            <CartBuyModal books={[
              {
                book_id: data.book_id,
                path: data.path,
                name: data.name,
                prices: data.prices,
                number: data.number
              }
            ]} text="直接购买"
             removeCart={()=>{
              removeCart(data.key).then((res)=>{
                setIsRender(!isRender);
              }).catch((e)=>{message.error("网络错误")})
            }}/>
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
      <CartBuyModal books={cart} text="全部购买"
             removeCart={()=>{removeAllCart(id);setIsRender(!isRender)}}/>
    </div>
  );
};
export default Cart;
