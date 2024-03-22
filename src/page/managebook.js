import React, {useState} from "react";
import {Input, Table, Image} from "antd";
import EditBook from "../components/editbook";
const {Search} = Input;

const columns = [
  {
    title: "书名",
    dataIndex: "bookname",
    render: (text) => {
      return text;
    }
  },
  {
    title: "作者",
    dataIndex: "author"
  },
  {
    title: "封面",
    dataIndex: "cover",
    render: () => <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" alt="cover" width={150} />
  },
  {
    title: "ISBN编号",
    dataIndex: "isbn"
  },
  {
    title: "库存量",
    dataIndex: "stock"
  },
  {
    title: "操作",
    dataIndex: "operation",
    render: () => {
      return (
        <div>
          <EditBook />
          &nbsp;
          <a href="#">删除</a>
        </div>
      );
    }
  }
];
const data = [
  {
    key: "1",
    bookname: "第七天",
    author: "余华",
    isbn: "9787544291220",
    stock: 100
  },
  {
    key: "2",
    bookname: "俄语入门",
    author: "Putin",
    isbn: "9787544291220",
    stock: 100
  },
  {
    key: "3",
    bookname: "C++ Primer Plus",
    author: "Stanley B. Lippman",
    isbn: "9787544291220",
    stock: 100
  },
  {
    key: "4",
    bookname: "道德经",
    author: "老子",
    isbn: "9787544291220",
    stock: 100
  }
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
  return (
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

        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};
export default ManageBook;
