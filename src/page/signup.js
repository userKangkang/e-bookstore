import React from "react";
import style from "../css/signup.module.css";
import {Button, Checkbox, Form, Input} from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Signup = () => {
  /* Signup form */
  return (
    <div className={style.main}>
      <img src={process.env.PUBLIC_URL + "/img/bggif7.gif"} className=" z-0 absolute top-0 left-0 h-[100%] w-[100%]" />
      <div className={style.signupbox}>
        <h2>欢迎新用户！</h2>
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!"
              }
            ]}
          >
            <Input className={style.radius} />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password className={style.radius} />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirm"
            rules={[
              {
                required: true,
                message: "Please confirm your password!"
              }
            ]}
          >
            <Input.Password className={style.radius} />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!"
              }
            ]}
          >
            <Input className={style.radius} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 7,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit" className={style.radius}>
              确定
            </Button>
            <Button type="primary" htmlType="reset" className={style.radius}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
