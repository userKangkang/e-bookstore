import React from "react";
import {Button, Flex, Card, Image, Upload, Form, Input, message} from "antd";
import {postSignup} from "../api/postSignup";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import { uploadImg } from "../api/uploadImg";
import style from "../css/signup.module.css";

const {TextArea} = Input;

const onFinish = (values) => {
  console.log("Success:", values);
  postSignup(values.username, values.password, values.email);
  message.success("注册成功");
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Signup = () => {
  /* Signup form */
  const [newAvatar, setNewAvatar] = useState("");

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onChange = async (value) => {
    setFileList(value.fileList);
    if(value.fileList.length > 0) {
      const file = value.fileList[0].originFileObj;
      const res = await uploadImg(file);
      setNewAvatar(res.data.data);
      form.setFieldValue("avatar",res.data.data);
    }
  }
  
  return (
    <Form encType="multipart/form-data" layout="vertical" size="large" onFinish={onFinish} className={style.main} form={form}>
      <Card
        title={
          <label style={{fontSize: 18}}>
            欢迎新用户
          </label>
        }
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "rgba(170,230,100,0.1)",
          borderRadius: "12px",
          borderTop: "2px solid #52c41a",
        }}
      >
        <Flex
          justify="space-between"
          style={{
            marginBottom: "20px"
          }}
        >
          <Form.Item
            className={style.formitem}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!"
              }
            ]}
          >
            <Flex vertical style={{width: "300px"}}>
              <label className={style.label}>用户名</label>
              <Input className={style.input} placeholder="用户名" />
            </Flex>
          </Form.Item>
          <Form.Item className={style.formitem}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              }
            ]}
          >
            <Flex vertical style={{width: "300px"}}>
              <label className={style.label}>密码</label>
              <Input className={style.input} type="password" placeholder="密码"/>
            </Flex>
          </Form.Item>
        </Flex>
        <Flex justify="space-between">
          <Form.Item className={style.formitem}
            name="avatar"
            valuePropName="fileList"
          >
            <Flex vertical style={{width: "300px"}}>
              <label className={style.label}>用户头像</label>
              <Flex vertical className={style.input} align="center">
                <Image src={newAvatar} width={"255px"} style={{marginBottom: "20px"}} />
                <Upload name="avatar" action="" onChange={onChange}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Flex>
            </Flex>
          </Form.Item>
          <Flex vertical style={{width: "45%"}}>
          <Form.Item className={style.formitem}
            name="email"
            rules={
              [
                {
                  type:"email"
                }
              ]
            }
          >
            <Flex vertical style={{width: "300px"}}>
              <label className={style.label}>邮箱</label>
              <Input className={style.input} placeholder="邮箱"/>
            </Flex>
          </Form.Item>
          <Form.Item className={style.formitem}
            name="hobby"
          >
            <Flex vertical style={{width: "300px"}}>
              <label className={style.label}>爱好</label>
              <Input className={style.input} placeholder="个人爱好"/>
            </Flex>
          </Form.Item>
          <Form.Item className={style.formitem}
            name="signature">
            <Flex vertical style={{width: "300px"}}>
              <label className={style.label}>个性签名</label>
              <TextArea className={style.input} rows={4} placeholder="个性签名" />
            </Flex>
          </Form.Item>
          </Flex>
        </Flex>
        <Flex>
          <Button style={{marginLeft: "auto", marginRight: "auto", borderRadius: "8px"}} type="primary" htmlType="submit">
            保存更改
          </Button>
        </Flex>
      </Card>
    </Form>
  );
};

export default Signup;
