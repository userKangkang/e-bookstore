import React from "react";
import {Button, Flex, Card, Image, Upload, Form, Input, message, Modal} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {useState} from "react";
import {updateBook} from "../../api/ManagerRelated";
import style from "../../css/signup.module.css";

const {TextArea} = Input;

const BeforeUpload = (file) => {

  const isImg = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
  if (!isImg) {
    message.error("请上传图片文件");
  }
  return isImg;
};

const UpdateBookModal = ({visible, setVisible, book, setRender, render}) => {
  /* Signup form */
  const [newPicture, setNewPicture] = useState(book.path);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onOk = () => {
    setVisible(false);
    form.submit();
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    updateBook({
      ...values,
      id: book.id
    }).then((res) => {
      if (res.code) {
        message.success("修改成功");
        setRender(!render);
      } else {
        message.error("修改失败");
      }
    });
  };

  const onChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      message.success("上传成功");
      setNewPicture(info.file.response.data);
      form.setFieldsValue({path: info.file.response.data});
    }
    if (info.file.status === "error") {
      message.error("上传失败");
    }
  };

  return (
    <Modal width={"780px"} title={"添加新书"} open={visible} onCancel={onCancel} onOk={onOk}>
      <Form encType="multipart/form-data" layout="vertical" size="large" onFinish={onFinish} className={style.main} form={form}>
        <Flex justify="space-between">
          <Flex vertical style={{width: "50%"}}>
            <Form.Item className={style.formitem} name="name" initialValue={book.name}>
              <Flex vertical style={{width: "300px"}}>
                <label className={style.label}>书名</label>
                <Input className={style.input} placeholder="书名" defaultValue={book.name} />
              </Flex>
            </Form.Item>
          </Flex>
          <Flex vertical style={{width: "50%"}}>
            <Form.Item className={style.formitem} name="author" initialValue={book.author}>
              <Flex vertical style={{width: "300px"}}>
                <label className={style.label}>作者</label>
                <Input className={style.input} placeholder="作者" defaultValue={book.author} />
              </Flex>
            </Form.Item>
          </Flex>
        </Flex>
        <Flex justify="space-between">
          <Form.Item className={style.formitem} name="path" valuePropName="fileList" initialValue={book.path}>
            <Flex vertical style={{width: "300px", marginTop: "10px"}}>
              <label className={style.label}>书籍封面</label>
              <Flex vertical className={style.input} align="center">
                <Image src={newPicture} width={"255px"} style={{marginBottom: "20px"}} />
                <Upload name="avatar" action="http://localhost:8080/upload/avatar" onChange={onChange} beforeUpload={BeforeUpload}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Flex>
            </Flex>
          </Form.Item>
          <Flex vertical style={{width: "50%"}}>
            <Form.Item className={style.formitem} name="price" initialValue={book.price / 100}>
              <Flex vertical style={{width: "300px"}}>
                <label className={style.label}>价格</label>
                <Input className={style.input} placeholder="价格" defaultValue={book.price / 100} />
              </Flex>
            </Form.Item>
            <Form.Item className={style.formitem} name="stock" initialValue={book.stock}>
              <Flex vertical style={{width: "300px"}}>
                <label className={style.label}>库存</label>
                <Input className={style.input} placeholder="库存" defaultValue={book.stock} />
              </Flex>
            </Form.Item>
            <Form.Item className={style.formitem} name="detail" initialValue={book.detail}>
              <Flex vertical style={{width: "300px"}}>
                <label className={style.label}>详细介绍</label>
                <TextArea className={style.input} rows={6} placeholder="详细介绍" defaultValue={book.detail} />
              </Flex>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};

export default UpdateBookModal;
