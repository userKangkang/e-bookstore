import React, {useState, useEffect} from "react";
import {Input, Table} from "antd";
import { getUserList } from "../../api/ManagerRelated";
const {Search} = Input;

const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    render: (text) => {
      return text;
    }
  },
  {
    title: "状态",
    dataIndex: "state"
  },
  {
    title: "操作",
    dataIndex: "operation",
    render: () => {
      return (
        <div>
          <a href="#">解禁</a>
          &nbsp;
          <a href="#">封禁</a>
        </div>
      );
    }
  }
];
const data = [
  {
    key: "1",
    name: "John Brown",
    state: "正常"
  },
  {
    key: "2",
    name: "Jim Green",
    state: "正常"
  },
  {
    key: "3",
    name: "Joe Black",
    state: "正常"
  },
  {
    key: "4",
    name: "Disabled User",
    state: "管理员"
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
const ManageUser = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserList();
      setUserList(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [])

  return (
    <div className=" w-[100%] flex justify-center">
      <div className=" w-[90%]">
        <h1>用户管理</h1>

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
          dataSource={userList}
        />
      </div>
    </div>
  );
};
export default ManageUser;
