import React from "react";
import {Divider, Input, Modal, message, Form, Flex, InputNumber} from "antd";
import { addOrder } from "../../api/orderRelated";
import style from "../../css/modal.module.css";

const {TextArea} = Input;

const BuyModal = ({visible, setVisible, book}) => {

    const [form] = Form.useForm();

    const onOk = () => {
        setVisible(false);
        form.submit();
    }

    const onCancel = () => {
        setVisible(false);
    }

    const onFinish = (values) => {
        const uid = localStorage.getItem("id");
        const prices = book.price * values.number;
        const order = {
            orderBooks: [
                {...book, number: values.number, prices: prices}
            ],
            address: values.address,
            money: prices,
            time: new Date(),
            uid: uid,
        }
        addOrder(order).then((res) => {
            if(res.code){
                message.success("购买成功");
            }else{
                message.error(res.message);
            }
        }).catch((e) => {
            message.error("网络错误");
        })
    }

    return (
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
                    <Flex className={style.formitem}>
                        <label className={style.label}>书名</label>
                        <div >{book.name}</div>
                    </Flex>

                    <Flex className={style.formitem}>
                        <label className={style.label}>作者</label>
                        <div >{book.author}</div>
                    </Flex>

                    <Flex className={style.formitem}>
                        <label className={style.label}>单价</label>
                        <div >{book.price}</div>
                    </Flex>


                
                    
                    <Form.Item className={style.formitem}  name="number">
                    <Flex vertical style={{ width: "40%" }} >
                        <label className={style.label}>数量</label>
                        <InputNumber className={style.input} placeholder="数量" min={1} max={10}
                        onChange={(value)=>{form.setFieldsValue({number: value})}}/>
                        </Flex>
                    </Form.Item>
                
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
    )
}

export default BuyModal;