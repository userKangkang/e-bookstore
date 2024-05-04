import React, {useState} from "react";
import UpdateBookModal from "../components/modals/updateBookModal";
import {Button, Modal} from "antd";
const EditBook = ({book}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <a href="#" onClick={showModal}>
        编辑
      </a>
      <UpdateBookModal visible={isModalOpen} setVisible={setIsModalOpen} book={book}/>
    </>
  );
};
export default EditBook;
