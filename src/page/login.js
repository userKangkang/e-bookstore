import React from "react";
import {Flex, Radio, Button, Checkbox, Form, Input} from "antd";
import {useNavigate} from "react-router-dom";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Login({children}) {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-row justify-end h-[500px] w-full bg-login-pattern pl-20 pr-20">
      <img src={process.env.PUBLIC_URL + "/img/bggif.gif"} className=" z-0 absolute top-0 left-0 h-[620px] w-screen" />
      <Flex vertical className=" flex flex-col border-2 pt-12 mt-auto mb-auto items-center w-96 h-[350px] rounded-lg bg-[rgba(255,255,255,0.6)] z-10">
        <h2 className=" mb-6 text-4xl text-green-600">e-BookStore</h2>
        <Form
          validateTrigger="onBlur"
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          className="pr-4 pl-4 mt-auto mb-auto max-h-52 flex flex-col items-center"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16
            }}
            className=" w-full"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
            className=" w-full"
          >
            <Button
              className=" bg-green-600 text-white "
              htmlType="submit"
              onClick={() => {
                navigate("/book");
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
}
