import React from 'react';
import { useState} from 'react';
import { Flex, Radio, Button, Checkbox, Form, Input } from "antd";

const onFinish = (values) => {
    console.log('Success:', values);
  };
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function Login({children}) {
    const [value, setValue] = useState('horizontal');
    return (
    <Flex vertical={true} justify="right" align="center">
      <h2 color='green'>e-BookStore</h2>
        <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      paddingRight: 50,
      maxHeight: 200,
      alignSelf: 'center',
      marginTop: 'auto',
      marginBottom: 'auto',
    }}
    initialValues={{
      remember: true,
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
          message: 'Please input your username!',
        },
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
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </Flex>
    );
}
