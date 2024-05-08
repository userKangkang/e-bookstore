import React from "react";
import {Input, Table, Image, Button, message} from "antd";
import EditBook from "../../components/editbook";
import { getBookList, getSearchBookList, deleteBook } from "../../api/ManagerRelated";
import { useState, useEffect } from "react";
import AddBookModal from "../../components/modals/addBookModal";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

const {Search} = Input;




// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name
  })
};
const ManageBook = () => {
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
            <EditBook book={data} setRender={setIsRender} render={isRender}/>
            &nbsp;
            <a onClick={()=>{deleteBook(data.id).then(
              (res) => {
                if(res.code){
                  setIsRender(!isRender);
                  message.success("删除成功");
                } else {
                  message.error("删除失败");
                }
              }
            )}}>删除</a>
          </div>
    },
  
  ];

  const navigate = useNavigate();

  const [Managedata, setManagedata] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [search, setSearch] = useState(null);
  
  useEffect(() => {
    const getSearchedBook = async () => {
      const res = await getSearchBookList(search);

      setManagedata(res.data);
    }
    const getBook = async () => {
      const res = await getBookList();

      setManagedata(res.data);
    }
    if(search === "" || search === null){
      getBook();
    } else {
      getSearchedBook(search);
    }
  },[isRender]);

  return (
    Managedata.length !== 0 && (
    <div className=" w-[100%] flex justify-center">
      <div className=" w-[96%]">
        <h1>书籍管理</h1>

        <Search
          placeholder="input search text"
          allowClear
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onSearch={() => {
            if (search !== "" && search !== null) {
              navigate(`/manager/books?search=${search}`);
              
            } else {
              navigate("/manager/books");
            }
            setIsRender(!isRender);
          }}
          style={{
            width: 200
          }}
        />
        <Button type="primary" style={{float: "right", borderRadius: "5px"}}
        onClick={()=>{setIsAdd(true)}}>添加书籍</Button>
        <AddBookModal visible={isAdd} setVisible={setIsAdd} setRender={setIsRender} render={isRender}/>
        <Table
          // rowSelection={{
          //   type: "checkbox",
          //   ...rowSelection
          // }}
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
