import React from "react";
import {Input, Table, Image, Button} from "antd";
import EditBook from "../../components/editbook";
import { getBookList } from "../../api/ManagerRelated";
import { useState, useEffect } from "react";
import AddBookModal from "../../components/modals/addBookModal";

import { render } from "@testing-library/react";

const {Search} = Input;

const columns = [
  {
    title: "书名",
    key: "name",
    dataIndex: "name",
    render: (text) => {
      return text;
    }
  },
  {
    title: "作者",
    key: "author",
    dataIndex: "author"
  },
  {
    title: "封面",
    key: "path",
    dataIndex: "path",
    render: (path) => <Image src={path} alt="cover" width={150} />
  },
  {
    title: "ISBN编号",
    key: "isbn",
    dataIndex: "isbn",
    render: (text) => <div>111111</div>
  },
  {
    title: "库存量",
    key: "stock",
    dataIndex: "stock"
  },
  {
    title: "操作",
    key: "action",
    render: (data) =>  
        <div>
          <EditBook book={data}/>
          &nbsp;
          <a href="#">删除</a>
        </div>
  },

];


// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name
  })
};
const ManageBook = () => {
  const [Managedata, setManagedata] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  
  useEffect(() => {
    const getBook = async () => {
      const res = await getBookList();
      console.log(res);
      setManagedata(res.data);
    }
    getBook();
  },[]);

  return (
    Managedata.length !== 0 && (
    <div className=" w-[100%] flex justify-center">
      <div className=" w-[96%]">
        <h1>书籍管理</h1>

        <Search
          placeholder="input search text"
          allowClear
          onSearch={(value) => console.log(value)}
          style={{
            width: 200
          }}
        />
        <Button type="primary" style={{float: "right", borderRadius: "5px"}}
        onClick={()=>{setIsAdd(true)}}>添加书籍</Button>
        <AddBookModal visible={isAdd} setVisible={setIsAdd} />
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection
          }}
          columns={columns}
          dataSource={Managedata}
          pagination={{
            pageSize: 5
          }}
        />
      </div>
    </div>)
  );
};
export default ManageBook;
