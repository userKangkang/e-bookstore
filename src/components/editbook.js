import React, {useState} from "react";
import UpdateBookModal from "../components/modals/updateBookModal";
import {Button, Modal} from "antd";
const EditBook = ({book, setRender, render}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <a href="#" onClick={showModal}>
        编辑
      </a>
      <UpdateBookModal visible={isModalOpen} setVisible={setIsModalOpen} book={book} setRender={setRender} render={render} />
    </>
  );
};
export default EditBook;
