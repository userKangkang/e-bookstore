import React from "react";
import {Button, Flex, Card, Image, Upload, Form, Input, message} from "antd";
import {postSignup} from "../api/postSignup";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import { uploadImg } from "../api/uploadImg";
import style from "../css/signup.module.css";

const {TextArea} = Input;

const onFinish = async (values) => {
  await postSignup({...values, state : 1}).then((res) => {
    console.log(res);
    if(res.code == 1) {
      message.success("注册成功");
    } else {
      message.error(res.message);
    }
  });
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const BeforeUpload = (file) => {
  console.log("beforeUpload");
  console.log(file);
  const isImg = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
  if(!isImg) {
    message.error("请上传图片文件");
  }
  return isImg;
}

const Signup = () => {
  /* Signup form */
  const [newAvatar, setNewAvatar] = useState("");

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onChange = (info) => {
    console.log(info);
    if(info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if(info.file.status === "done") {
      setLoading(false);
      message.success("上传成功");
      setNewAvatar(info.file.response.data);
      form.setFieldsValue({avatar: info.file.response.data});
    }
    if(info.file.status === "error") {
      message.error("上传失败");
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
                <Upload name="avatar" action="http://localhost:8080/upload/avatar" onChange={onChange} beforeUpload={BeforeUpload}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Flex>
            </Flex>
          </Form.Item>
          <Flex vertical style={{width: "45%"}}>
          <Form.Item className={style.formitem} style={{width: "350px"}}
            name="comfirm"
            rules={[
              {
                required: true,
                message: "Please input your password!"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Flex vertical style={{width: "300px"}}>
              <label className={style.label}>确认密码</label>
              <Input className={style.input} type="password" placeholder="密码"/>
            </Flex>
          </Form.Item>
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
            确认注册
          </Button>
        </Flex>
      </Card>
    </Form>
  );
};

export default Signup;
