import React from "react";
import {Divider, Input, Modal, message, Form, Flex, InputNumber} from "antd";
import { addCart } from "../../api/CartRelated";
import style from "../../css/modal.module.css";

const {TextArea} = Input;

const CartModal = ({visible, setVisible, book}) => {

    const id = localStorage.getItem("id");

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
        console.log(uid);
        const prices = book.price * values.number;
        const cart = {
            ...book,
            ...values,
            prices: prices,
            time: new Date(),
            uid: uid
        }
        console.log(cart);
        addCart(Number(id), cart).then((res) => {
            if(res.code){
                message.success("添加成功");
            }else{
                message.error(res.message);
            }
        }).catch((e) => {
            message.error("网络错误");
        })
    }

    return (
        <Modal title={"添加至购物车"} open={visible} onCancel={onCancel} onOk={onOk}>
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
                
            </Flex>
        </Form>
        </Modal>
    )
}

export default CartModal;