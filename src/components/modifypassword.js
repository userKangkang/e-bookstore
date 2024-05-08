import React, {useState} from "react";
import {Form, Modal, Input} from "antd";
import {useSelector, useDispatch} from "react-redux";
import {setPassword} from "../store/modules/loginStore";
import {modifyPwd} from "../api/modifyUser";
const ModifyPassword = () => {
  const oldpwd = useSelector((state) => state.login.password);
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    if (oldPassword !== oldpwd) {
      alert("原密码错误");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("两次密码不一致");
      return;
    }
    setConfirmLoading(true);
    dispatch(setPassword(newPassword));
    modifyPwd(newPassword);

    setOpen(false);
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <div onClick={showModal}>修改密码</div>
      <Modal title="请修改你的密码" open={open} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        <Input
          placeholder="请输入原密码"
          addonBefore={"原密码："}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
          style={{
            marginBottom: "20px"
          }}
          type="password"
        />
        <Input
          placeholder="请输入新密码"
          type="password"
          addonBefore={"新密码："}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          style={{
            marginBottom: "20px"
          }}
        />
        <Input
          placeholder="请再次输入新密码"
          type="password"
          addonBefore={"确认密码："}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};
export default ModifyPassword;
