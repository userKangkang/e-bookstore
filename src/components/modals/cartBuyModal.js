import React, {useState} from "react";
import {Divider, Input, Modal, message, Form, Flex, InputNumber, Table, Button} from "antd";
import { buyBooksByCart } from "../../api/CartRelated";
import style from "../../css/modal.module.css";
import { forEach } from "lodash";

const {TextArea} = Input;

const CartBuyModal = ({books, removeCart, text}) => {

    const [visible, setVisible] = useState(false);

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
          key: "prices",
          render: (prices) => <span>{prices / 100}元</span>
        },
        {
          title: "数量",
          key: "number",
          render: (data) => <InputNumber min={1} max={10} defaultValue={data.number} onChange={(value) => {}} />
        },
      ];

    const [form] = Form.useForm();

    const onOk = () => {
        setVisible(false);
        form.submit();
    }

    const onCancel = () => {
        setVisible(false);
    }

    const onFinish = (values) => {
        const uid = sessionStorage.getItem("id");
        let money = 0;
        forEach(books, (book) => {
            money += book.prices;
        })
        const order = {
            orderBooks: 
                books.map((book) => {
                    return {
                        ...book,
                        number: book.number,
                        prices: book.prices
                    }
                })
            ,
            address: values.address,
            money: money,
            time: new Date(),
            uid: uid,
        }
        buyBooksByCart(order).then((res) => {
            if(res.code){
                message.success("购买成功");
                removeCart();
            }else{
                message.error(res.message);
            }
        }).catch((e) => {
            message.error("网络错误");
        })
        
    }

    return (
        <div>
        <Button onClick={()=>{setVisible(true)}} type="primary" style={{
            borderRadius: "5px",
        }} disabled={books.length === 0}>{text}</Button>
        <Modal title={"确认订单"} open={visible} onCancel={onCancel} onOk={onOk}>
        <Divider/>
        <Form style={{
            width: "100%",
        }}
          form={form}
          onFinish={onFinish}
        >
            <Flex
                justify="center"
                align="center"
                vertical
                style={{
                    marginBottom: "20px",
                    width: "100%"
                }}
            >
                <Table columns={columns} dataSource={books} />
                
                <Form.Item
                    className={style.formitem}
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "请输入你的收件地址！"
                        }
                    ]}>
                    <Flex vertical style={{ width: "100%" }}>
                        <label className={style.label}>收件地址</label>
                        <TextArea className={style.input} placeholder="收件地址" rows={5}/>
                    </Flex>
                </Form.Item>
            </Flex>
        </Form>
        </Modal>
        </div>
    )
}

export default CartBuyModal;