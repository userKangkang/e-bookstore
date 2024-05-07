import React, {useState, useEffect} from "react";
import {Button, Input, Table, message} from "antd";
import { getUserList } from "../../api/ManagerRelated";
import { disableUser, enableUser } from "../../api/ManagerRelated";
const {Search} = Input;



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

  const [render, setRender] = useState(false);

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
      dataIndex: "state",
      render: (state) => {
        if(state == 1) {
          return "正常";
        } else {
          return "封禁";
        }
      }
    },
    {
      title: "身份",
      dataIndex: "identity",
      render: (identity) => {
        if(identity == 0) {
          return "用户";
        } else {
          return "管理员";
        }
      }
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <div>
            {data.state == 1 ? (
              <Button type="primary" onClick={() => {disableUser(data.id); message.success("封禁成功"); setRender(!render)}} disabled={data.identity == 1}>封禁</Button>
            ): <Button type="primary" onClick={() => {enableUser(data.id); message.success("解禁成功"); setRender(!render)}}>解封</Button>}
          </div>
        );
      }
    }
  ];


  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserList();
      setUserList(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [render])

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
