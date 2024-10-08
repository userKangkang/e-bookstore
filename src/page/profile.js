import React, { useEffect } from "react";
import {Input, Image, Upload, Button, Form, message, Card, Flex} from "antd";
import style from "../css/profile.module.css";
import {UploadOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {useState} from "react";
import { uploadImg } from "../api/uploadImg";
import { modifyProfile } from "../api/modifyUser";

const {TextArea} = Input;

const BeforeUpload = (file) => {
  const isImg = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
  if(!isImg) {
    message.error("请上传图片文件");
  }
  return isImg;
}

const Profile = () => {

  const user = localStorage.getItem("username");
  const id = localStorage.getItem("id");
  const avatar = localStorage.getItem("avatar");
  const hobby = localStorage.getItem("hobby");
  const signature = localStorage.getItem("signature");
  

  const onFinish = (values) => {

    modifyProfile(id, values.username, values.hobby, values.avatar || avatar, values.signature);
    message.success("保存成功");
  }

  const [loading, setLoading] = useState(false);
  const [newAvatar, setNewAvatar] = useState(avatar);

  const [form] = Form.useForm();

  const onChange = (info) => {

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
    <Form encType="multipart/form-data" layout="vertical" size="middle" onFinish={onFinish} className={style.main} form={form}
    style={{marginLeft: "90px"}}>
      <Card
        title={
          <label style={{fontSize: 18}} className={{width: "100%"}}>
            个人信息
          </label>
        }
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
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
            initialValue={user}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!"
              }
            ]}
          >
            <Flex>
              <label style={{width: "150px", textAlign: "right"}}>用户名：</label>
              <Input style={{width: "450px"}} placeholder="用户名" defaultValue={user} />
            </Flex>
          </Form.Item>
          <Form.Item className={style.formitem} initialValue={hobby}
            name="hobby"
          >
            <Flex>
              <label style={{width: "150px", textAlign: "right"}}>爱好：</label>
              <Input style={{width: "450px"}} placeholder="个人爱好" defaultValue={hobby} />
            </Flex>
          </Form.Item>
        </Flex>
        <Flex justify="space-between">
          <Form.Item className={style.formitem}
            name="avatar"
            valuePropName="fileList"
          >
            <Flex>
              <label style={{width: "150px", textAlign: "right"}}>用户头像：</label>
              <Flex vertical width={"255px"} align="center">
                <Image src={newAvatar} width={"255px"} style={{marginBottom: "20px"}} />
                <Upload 
                  name="avatar" 
                  action="http://localhost:8080/upload/avatar" 
                  onChange={onChange}
                  beforeUpload={BeforeUpload}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Flex>
            </Flex>
          </Form.Item>
          <Form.Item className={style.formitem} initialValue={signature}
            name="signature">
            <Flex>
              <label style={{width: "150px", textAlign: "right"}}>个性签名：</label>
              <TextArea style={{width: "450px"}} rows={8} placeholder="个性签名" defaultValue={signature}/>
            </Flex>
          </Form.Item>
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

export default Profile;
